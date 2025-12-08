const jwt = require('jsonwebtoken')

require('dotenv').config()

function ValidateToken ( req , res , next ) {

    const AuthHeaders = req.headers['authorization']

    if(!AuthHeaders) return res.status(400).json({err : 'Invalid Headers'})

    const token = AuthHeaders.split(' ')[1]
    
    try{

        const isValid = jwt.verify(token , process.env.JWT_SECRET_KEY)

        req.user = isValid

        next()

    }catch(err){
        return res.status(401).json({errMessage : 'Invalid Token', err : err})
    }

}

module.exports = ValidateToken