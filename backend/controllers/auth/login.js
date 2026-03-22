const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); //importing node libraries

const db = require('../../middlewares/db'); //importing db middlewares
const LoginSchema = require('../../schemas/LoginSchema'); //importing login shcema

async function login(req,res) {

    const validateLogin = LoginSchema(req.body.data); //passing request data to zod validator

    if(!validateLogin.success) return res.status(400).json({message : 'Invalid Inputs'});//returnign 400 status code if zod validaiton fails

    try{
        const userData = req.body.data; //defining request's body's data

        const [rows] = await db.query('select * from users where email = ?' , [userData.email]); //searching for user in db
        if(rows.length < 1) return res.status(404).json({message : 'User Not Found'}); //returnign 404 status error code if user is not found in users table
        
        const user = rows[0]; //defining users from query's data
        
        const isPasswordValid = await bcrypt.compare(userData.password , user.password); //comparing password by decrypting with bcrypt
        if(!isPasswordValid) return res.status(400).json({message : 'Invalid Email Or Password'}); //returning error message if password do not match (returning Invalid Email Or Password Message so attackers will have harder time guessing which input is valid/invalid)
        
        const payload = {userId : user.id , userEmail : userData.email}; //creating payload for jwt
        const token = jwt.sign(payload , process.env.JWT_SECRET_KEY , {expiresIn : '30d'}); //signing jwt token
        
        return res.status(200).json({message : 'Loginned' , token : token});//sending token to frontend

    }catch(err){
        return res.status(500).json({message : "Could Not Login Into Account. Try Later"}); //returning 500 status code error messages
    };
};


module.exports = login; //exporting service