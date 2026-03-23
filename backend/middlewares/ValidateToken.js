const jwt = require('jsonwebtoken'); //importing jwt library

require('dotenv').config(); //importing env file

function ValidateToken ( req , res , next ) {

    const AuthHeaders = req.headers['authorization'];//defining authorization headers

    if(!AuthHeaders) return res.status(400).json({err : 'Invalid Headers'});//returning error messages if hjeaders are udnefined
    const token = AuthHeaders.split(' ')[1]; //getting token from headers if exists
    
    try{

        const isValid = jwt.verify(token , process.env.JWT_SECRET_KEY); //validating token from headers
        req.user = isValid; //defining verified token inside req.user variable 

        next(); //calling api after middleware finishes its work

    }catch(err){
        return res.status(401).json({message: 'Invalid Token'}); //returning 401 error if jwt does not verify token provided
    };
};

module.exports = ValidateToken; //exporting middelware