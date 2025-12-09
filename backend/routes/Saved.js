const express = require('express')
const ValidateToken = require('../config/ValidateToken')
const SavedRouter = express.Router()

SavedRouter.get('/' , ValidateToken , async(req,res) => {

    try{

        const [ saved ] = await db.query('select * from saved_products where id = ?' , req.user.userId)

        if(saved.length < 1) return res.status(400).json({errMessage : 'No Products Saved' , saved_products : []})

        return res.status(200).json({message : 'Succesfully Fetched Saved Products' , saved_products : saved})

    }catch(err){
        return res.status(500).json({errMessage : 'Internal Error' , err : err})
    }

})

module.exports = SavedRouter