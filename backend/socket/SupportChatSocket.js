require('dotenv').config(); //importing env file

const url  = require('url'); //importing url to status websocket service
const { WebSocketServer } = require('ws'); //importing websocket

const rooms = require('./socket.stores/rooms');
const onlineAdmins = require('./socket.stores/onlineAdmins'); //importing web socket objects 

const db = require('../utils/db'); //importing db utility

const ValidateSocketToken = require('./socket.middlewares/ValidateSocketToken');
const ValidateSocketAdmin = require('./socket.middlewares/ValidateSocketAdmin');
const asignToAdmin = require('./socket.middlewares/asignToAdmin');
const handleMessageLoad = require('./socket.middlewares/handleMessageLoad');
const handleRooms = require('./socket.middlewares/handleRooms');
const handleConvId = require('./socket.middlewares/handleConvId');
const handleJoinConv = require('./socket.middlewares/handleJoinConv'); //impoorting middlewares

function SupportChatSocket (server) {
    
    const wss = new WebSocketServer({ server }); //creating web socket server
    
    wss.on("connection" , async(ws, req) => {

        const query = url.parse(req.url, true).query; //parsing url
        const token = query.token; //retrieving token from url
        const gainAdminAccess = query.gainAdminAccess; //checking if user makes request to gain admin access

        const validatedUser = ValidateSocketToken(token , ws); //token validator middleware
        if(!validatedUser) return; //returning error message from middleware if token validation fails

        if(!gainAdminAccess){ //if user do not request admin access it means that user is customer and want to connect to support
            const generateConvId = handleConvId(ws.user ,ws); //generating conversation id for customer
            if(!generateConvId) return; //returning middleware error  message
        };

        const loadMessages = handleMessageLoad(ws.user, ws.convId , ws); //loading messages based on convId for customer
        if(!loadMessages) return;//returnign middleware error message
        

        if(gainAdminAccess){ //if user request admin access
            
            const validateAdmin = ValidateSocketAdmin(ws.user , ws ); //validating user with middleware to check if they are admin
            if(!validateAdmin)return; //returnign middleware error message if validating fails
            
            const loadRooms = handleRooms(ws.user , ws); //loading rooms if user admin validation successs
            if(!loadRooms) return; //returning middleware error message 
        };

        ws.send(JSON.stringify({type : 'recieve_admin_list' , list : [Object.fromEntries(onlineAdmins)]})); //sending online admin list to frontned

        
        ws.on('message' , async(data) => { //message events

            const message = JSON.parse(data.toString()); //parsing message requests

            if(message.type === 'join_conv'){

                ws.convId = message.convId; //defining conveersation id from request

                const joinConversation = handleJoinConv(ws.adminUser, ws.convId ,ws); //joining user to conversation
                if(!joinConversation) return; //returnign middleware error message

                ws.send(JSON.stringify({ type: 'conv_info', message: `Joined conversation ${message.convId}`, convId : message.convId })); //returning success message to customer

            };


            if(message.type === 'message_status'){

                if (!['Seen', 'Delivered'].includes(message.status)) {
                    return ws.send(JSON.stringify({type: 'error',message: 'Invalid Message Status'})); //returning error message
                }; //validating incoming message status

                try{

                    await db.query('update support_messages set status = ? where sender_id != ? and conversation_id = ?',[message.status, ws.user.userId, message.convId]);//updating message status ('seen' or 'delivered') 
                    ws.send(JSON.stringify({type: 'message_status' , status : 'Seen', message: "Message Seen"}));//returnign success meessage

                }catch(err){
                    ws.send(JSON.stringify({type: 'internal_error' , message: "Could Not Update Message Status"}));//returnign internal error meessage
                    ws.close();//closing web socket connection
                };
            };

            if(message.type === 'end_chat'){
                try{

                    ws.send(JSON.stringify({type: 'recieve_chat_end'})); //sending event to both admin and customer that triggers frontend functions
                    await db.query('delete from support_messages where conversation_id = ?' , [ message.convId ]); //deleting support messages with providen convId

                }catch(err){
                    ws.send(JSON.stringify({type: 'internal_error' , message: "Could Not End Conversation"}));//returnign internal error meessage
                    ws.close();//closing web socket connection
                };
            };

            if(message.type ==  'support_chat_message'){
                try{

                    await db.query('insert into support_messages (conversation_id, sender_id , content, status) values (?,?,?,?)', [message.convId , ws.user.userId , message.text, "Delivered"]); //inserting message into support_messages table
                    ws.send(JSON.stringify({type : 'message_status' , status : 'Delivered' ,message : "Message Sent Successfully"})); //sending success message

                    if(!message.convId){ //if user does not have convId then
                        const generateConvId = handleConvId(ws.user ,ws); //passing user data to convid generator middleware
                        if(!generateConvId) return; //returning middleware error message
                    };

                    const asignConvToAdmin = asignToAdmin(ws.convId , ws); //passing convid to converastion admin assigner middleware 
                    if(!asignConvToAdmin) return; //returning middleware error message

                    const loadMessages = handleMessageLoad(ws.user, ws.convId , ws); //triggerring loading previous message middleware
                    if(!loadMessages) return;//returning middleware error message
                    
                    if(ws.adminUser){ //checking if user is admin
                        const loadRooms = handleRooms(ws.user , ws ); //if user is admin loading rooms for their sidebar with middleware
                        if(!loadRooms) return; //returning middleware error message
                    } 
                    
                    return; //returningnin empty promise if any unhandled event occurs

                }catch(err){
                    ws.send(JSON.stringify({type : 'internal_error' ,message : "Message Sent Failed"})); //sending internal error message
                    ws.close();//closing connection if internal errror occurs
                };
              };
        });

        ws.on('close', () => { //web socket closing events
            
            const clients = rooms.get(ws.convId); //defining online customers

            if (clients) { //if client object exists
                clients.delete(ws); //removing clients from online customers object
                if (clients.size === 0) {rooms.delete(ws.convId);} //if clients size will be 0 then we remove rooms object
            };

            if (ws.adminUser?.userId) { //if disconnected user is admin
                const admins = onlineAdmins.get(ws.adminUser.userId); //getting admins object
                if (admins) admins.delete(ws.adminUser.userId); //if admin was in admin object removing them from it
            };
            
            ws.send(JSON.stringify({type : 'recieve_admin_list' , list : [Object.fromEntries(onlineAdmins)]})); //sending updated admin list to frontend

        });
    });
};

module.exports = SupportChatSocket; //exporting websocket server