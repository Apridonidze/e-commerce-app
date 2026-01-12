const db = require("../config/db")
const ValidateSocketToken = require("../config/ValidateSocketToken");
const crypto = require('crypto');

function chatSocket (io) {

    const adminList = [];

    io.use(ValidateSocketToken)//add admin status cheecking in middleware

    io.on('connection', (socket) => {
        

        socket.on('join' ,async(user) => {
            
            //add admin filter hjjere
        })

        socket.on('generateConvId', async() => {

            let convId;
            const [isConvIdCreated] = await db.query('select * from support_messages where sender_id = ?' , socket.user.userId)
            if(isConvIdCreated.length > 0) convId = isConvIdCreated[isConvIdCreated.length - 1].conversation_id; 
            else convId = crypto.randomBytes(6).toString('hex');

            socket.emit('generateConvId' ,convId)

            console.log(convId)

           
        })

        socket.on('sendMessage' , async(message) => {

            
            await db.query('insert into support_messages (conversation_id , sender_id ,content) values (?,?,?)' , [message.convId, socket.user.userId, message.message])

            socket.emit('sendMessage' , message.message)
            
        })
        
    })

    

}

module.exports = chatSocket;