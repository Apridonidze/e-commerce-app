const db = require("../config/db")
const ValidateSocketToken = require("../config/ValidateSocketToken");
const crypto = require('crypto');

function chatSocket (io) {

    const adminList = [];

    io.use(ValidateSocketToken)//add admin status cheecking in middleware

    io.on('connection', (socket) => {
        

        socket.on('join' ,async() => {
            
            //generate random conv_id on join and send it to user (not admin)
            

            const [isAdmin] = await db.query('select * from admin where id = ?', socket.user.userId)
            if(isAdmin.length === 0) return;

            if(adminList.filter(admin => admin == isAdmin[0])) return adminList;
    
            adminList.push(isAdmin[0])
            
            io.emit('adminList' , adminList)

        })

        socket.on('sendMessage' , (message) => {
            //filter message


            socket.emit('sendMessage' , message)
            
        })

        
    })

}

module.exports = chatSocket;