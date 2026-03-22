const db = require('../../utils/db'); //importing db middleware
const SignSchema = require('../../schemas/SignSchema'); //importing zod schema

const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); //importing node libraries for signing

require('dotenv').config(); //importing env file

async function sign(req,res) {

    const inputValidateResp = SignSchema(req.body.data); //passing request's body data to zod validator
    
    if(!inputValidateResp.success) return res.status(400).json({message : "Invalid Credidentials Provided."}); //sending 400 status code error if validation fails
        
    try{

        const userinputs = req.body.data; //defining request's body data
        const hasshedPassword = await bcrypt.hash(userinputs.password , 10); //hasshing password to store in db

        const [createUser] = await db.query('insert into users (fullname, email, country_code, phone, password) values (?, ?, ?, ?, ?)',[userinputs.name ,userinputs.email, userinputs.phoneNumber.split(' ')[0],userinputs.phoneNumber.split(' ')[1], hasshedPassword]); //inserting user data into users table

        if(createUser.affectedRows === 0) return res.status(400).json({message : 'Could Not Register New User.'}); ///returning 400 status code error if 0 rows are affected after query insertion
        
        const payload = {userId : createUser.insertId, userEmail : userinputs.email}; //creating payload for tokenm
        const token = jwt.sign(payload , process.env.JWT_SECRET_KEY , {expiresIn : "30d"}); //signing token

        return res.status(200).json({message : 'User Created Successfully' , token : token}); //sending token to user

    }catch(err){
        if(err.code === 'ER_DUP_ENTRY'){
            if(err.message.includes('users.fullname'))return res.status(400).json({errMessage : 'This Name Is Already In Use' , state : 'name'}); //sending erorr with input names that caused error 
            if(err.message.includes('users.email'))return res.status(400).json({errMessage : 'This Email Is Already In Use' , state : 'email'});//sending erorr with input names that caused error
        };
        return res.status(500).json({errMessage : 'Could Not Register. Try Later'}); //returnign 500 status code error in any other internal error casses
    };
};

module.exports = sign; //exporting service