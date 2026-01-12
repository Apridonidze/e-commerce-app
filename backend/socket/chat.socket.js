const db = require("../config/db")
const ValidateSocketToken = require("../config/ValidateSocketToken");
const crypto = require('crypto');

function chatSocket (io) {

    const adminList = [];

    io.use(ValidateSocketToken)//add admin status cheecking in middleware

    io.on('connection', (socket) => {
        

        socket.on('join' ,async() => {
            
            const user = socket.user
            const [checkAdmin] = await db.query('select * from admin where id = ?' , user.userId)
            if(checkAdmin.length === 0) return adminList;

            if(adminList.some(adm => adm.userId === user.userId)) return adminList;
            else adminList.push(user)
            
            
            socket.emit('adminsOnline' , adminList)
            
            //check if user is admin 
            //avoid duplicates
            //add on dissconnect event in frontend
        })

        socket.on('generateConvId', async() => {

            let convId;
            const [isConvIdCreated] = await db.query('select * from support_messages where sender_id = ?' , socket.user.userId)
            if(isConvIdCreated.length > 0) convId = isConvIdCreated[isConvIdCreated.length - 1].conversation_id; 
            else convId = crypto.randomBytes(6).toString('hex');

            socket.emit('generateConvId' ,convId)

            socket.join(convId)

            const [prevMessages] = await db.query('select support_messages.sender_id , support_messages.content, support_messages.created_at from support_messages join users on support_messages.sender_id = users.id where support_messages.conversation_id  = ? ORDER BY support_messages.message_id DESC LIMIT 15' , [convId])
            
            socket.emit('recieveMessage' , prevMessages.reverse())
           
        })


        //add admin room join event here

        socket.on('sendMessage' , async(message) => {
            
            await db.query('insert into support_messages (conversation_id , sender_id ,content) values (?,?,?)' , [message.convId, socket.user.userId, message.message])
            
            const [prevMessages] = await db.query('select support_messages.sender_id , support_messages.content, support_messages.created_at from support_messages join users on support_messages.sender_id = users.id where support_messages.conversation_id  = ? ORDER BY support_messages.message_id DESC  LIMIT 15' , [message.convId]) //change limit nubmbers with message_index (we will recieve id from frontend after scrolling)
            
            socket.emit('recieveMessage' , prevMessages.reverse())
        })

        

        
    })

}

module.exports = chatSocket;