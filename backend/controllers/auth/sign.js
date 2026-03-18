const SignSchema = require('../../schemas/SignSchema')

const db = require('../../middlewares/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()

async function sign(req,res) {

    const inputValidateResp = SignSchema(req.body.data)
    
    if(!inputValidateResp.success) return res.status(400).json('Invalid Input')
        
    try{

        const userinputs = req.body.data

        const hasshedPassword = await bcrypt.hash(userinputs.password , 10)            
        const [createUser] = await db.query('INSERT INTO users (fullname, email, country_code, phone, password) VALUES (?, ?, ?, ?, ?)',[userinputs.name ,userinputs.email, userinputs.phoneNumber.split(' ')[0],userinputs.phoneNumber.split(' ')[1], hasshedPassword]);
        
        const payload = {userId : createUser.insertId, userEmail : userinputs.email}
        const token = jwt.sign(payload , process.env.JWT_SECRET_KEY , {expiresIn : "30d"})

        return res.status(200).json({message : 'User Created Successfully' , token : token})

    }catch(err){
        if(err.code === 'ER_DUP_ENTRY'){
            if(err.message.includes('users.fullname'))return res.status(400).json({errMessage : 'This Name Is Already In Use' , state : 'name' , err : err})
            if(err.message.includes('users.email'))return res.status(400).json({errMessage : 'This Email Is Already In Use' , state : 'email' , err : err})
        }
        return res.status(500).json({errMessage : 'Internal Error'  , err : err})
    }
}

module.exports = sign