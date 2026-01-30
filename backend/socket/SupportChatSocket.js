const url  = require('url');
const { WebSocketServer } = require('ws');

const ValidateSocketToken = require('../socket.config/ValidateSocketToken');
const ValidateSocketAdmin = require('../socket.config/ValidateSocketAdmin')
const db = require('../config/db')

const { v4: uuid } = require("uuid");
const asignToAdmin = require('../socket.config/asignToAdmin');
const handleMessageLoad = require('../socket.config/handleMessageLoad');
const handleRooms = require('../socket.config/handleRooms');
const handleConvId = require('../socket.config/handleConvId');
const handleJoinConv = require('../socket.config/handleJoinConv')

const rooms = require('../ws.store/rooms');
const onlineAdmins = require('../ws.store/onlineAdmins');

require('dotenv').config();

function SupportChatSocket (server) {
    
    const wss = new WebSocketServer({ server })
    
    wss.on("connection" , async(ws, req) => {
        
        console.log('SupportChatSocket initialized');

        const query = url.parse(req.url, true).query;
        const token = query.token;
        const gainAdminAccess = query.gainAdminAccess

        const validatedUser = ValidateSocketToken(token , ws)
        if(!validatedUser) return;

        if(!gainAdminAccess){
            const generateConvId = handleConvId(ws.user ,ws)
            if(!generateConvId) return
        }

        const loadMessages = handleMessageLoad(ws.user, ws.convId , ws)
        if(!loadMessages) return;
        

        if(gainAdminAccess){
            
            const validateAdmin = ValidateSocketAdmin(ws.user , ws )
            if(!validateAdmin)return;
            
            const loadRooms = handleRooms(ws.user , ws )
            if(!loadRooms) return;
        }
        

        
        ws.on('message' , async(data) => {

            const message = JSON.parse(data.toString())

            if(message.type === 'join_conv'){

                ws.convId = message.convId
                ws.send(JSON.stringify({ type: 'conv_info', message: `Joined conversation ${message.convId}`, convId : message.convId }));

                const joinConversation = handleJoinConv(ws.adminUser, ws.convId ,ws);
                if(!joinConversation) return;

            }


            if(message.type === 'message_status'){
                
                await db.query('UPDATE support_messages SET status = ? WHERE sender_id != ? AND conversation_id = ?',[message.status, ws.user.userId, message.convId]);
                ws.send(JSON.stringify({type: 'message_status' , status : 'Seen', message: "Message Seen"}))

            }


            if(message.type ==  'support_chat_message'){


                try{

                    await db.query('insert into support_messages (conversation_id, sender_id , content, status) values (?,?,?,?)', [message.convId , ws.user.userId , message.text, "Delivered"])
                    ws.send(JSON.stringify({type : 'message_status' , status : 'Delivered' ,message : "Message Sent Successfully"}))

                    if(!message.convId){
                        const generateConvId = handleConvId(ws.user ,ws)
                        if(!generateConvId) return
                    }

                    const asignConvToAdmin = asignToAdmin(ws.convId , ws)
                    if(!asignConvToAdmin) return;

                    const loadMessages = handleMessageLoad(ws.user, ws.convId , ws)
                    if(!loadMessages) return;
                    
                    if(ws.adminUser){
                        const loadRooms = handleRooms(ws.user , ws )
                        if(!loadRooms) return;
                    } return;


                }catch(err){
                    //close connection
                    console.log(err) //remove in future
                    ws.send(JSON.stringify({type : 'internal_error' ,message : "Message Sent Failed"}))
                }
              }                

              //add onmessage for admin to end conversation
        })

        ws.on('close', () => {
            console.log('WebSocket client disconnected');

            
            const clients = rooms.get(ws.convId);

            if (clients) {
                clients.delete(ws);
                if (clients.size === 0) {rooms.delete(ws.convId);}
            }

            if (ws.adminUser?.userId) {
                const admins = onlineAdmins.get(ws.adminUser.userId);
                if (admins) admins.delete(ws.adminUser.userId);
                console.log(admins);

                //send adminlist via ws
            }

        });
    })
}

module.exports = SupportChatSocket