const url  = require('url');
const { WebSocketServer } = require('ws');

const ValidateSocketToken = require('../socket.config/ValidateSocketToken');
const ValidateSocketAdmin = require('../socket.config/ValidateSocketAdmin')
const db = require('../config/db')

const { v4: uuid } = require("uuid");
const handleMessageLoad = require('../socket.config/handleMessageLoad');
const handleRooms = require('../socket.config/handleRooms');
const rooms = require('../socket.config/rooms');
const handleConvId = require('../socket.config/handleConvId');

require('dotenv').config();

const adminList = []

function SupportChatSocket (server) {
    
    const wss = new WebSocketServer({ server })
    
    wss.on("connection" , async(ws, req) => {

        console.log('SupportChatSocket initialized');

        const query = url.parse(req.url, true).query;
        const token = query.token;
        const gainAdminAccess = query.gainAdminAccess

        const validatedUser = ValidateSocketToken(token , ws)
        if(!validatedUser) return;

        const generateConvId = handleConvId(ws.user ,ws)
        if(!generateConvId) return

        const loadMessages = handleMessageLoad(ws.user, ws.convId , ws)
        if(!loadMessages) return;
        

        if(gainAdminAccess){
            
            const validateAdmin = ValidateSocketAdmin(ws.user , ws , adminList)
            if(!validateAdmin)return;
            
            const loadRooms = handleRooms(ws.user , ws )
            if(!loadRooms) return;
        }
        
        

        try{

            const [ AdminList ] = await db.query('select admin.id from admin join users on admin.id = users.id where admin.id = ?',[ws.user.userId])
            
            if(AdminList.length > 0) {
                if(adminList.some(adm => adm === ws.user.userId)) adminList;
                else adminList.push(ws.user.userId)
            };

            ws.send(JSON.stringify({type: 'recieve_admin_list' , adminList : adminList}))

        }catch(err){
            ws.send(JSON.stringify({type: 'internal_error', message : err}))
        }

        
            
        ws.on('message' , async(data) => {

            const message = JSON.parse(data.toString())


            if(message.type ==  'support_chat_message'){

                //validate message if now valid send error message
                //if not validated return ws.send(JSON.stringify({type : 'internal_error' ,message : "Message Sent Failed"}))
                try{

                    await db.query('insert into support_messages (conversation_id, sender_id , content) values (?,?,?)', [message.convId , ws.user.userId , message.text])
                    ws.send(JSON.stringify({type : 'message_status' , status : true ,message : "Message Sent Successfully"}))

                    const generateConvId = handleConvId(ws.user ,ws)
                    if(!generateConvId) return

                    const loadMessages = handleMessageLoad(ws.user, ws.convId , ws)
                    if(!loadMessages) return;
                    
                    
                    
                    const loadRooms = handleRooms(ws.user , ws )
                    if(!loadRooms) return;


                }catch(err){
                    //close connection
                    console.log(err) //remove in future
                    ws.send(JSON.stringify({type : 'internal_error' ,message : "Message Sent Failed"}))
                }
              }
        })

        ws.on('close', () => {
            console.log('WebSocket client disconnected');

            
            const clients = rooms.get(ws.convId);

            if (clients) {
                clients.delete(ws);
                if (clients.size === 0) {rooms.delete(ws.convId);}
            }

            adminList.filter(adm => adm !== ws.user.userId)

            ws.send(JSON.stringify({type: 'recieve_admin_list' , adminList : adminList}))
        });
    })
}

module.exports = SupportChatSocket