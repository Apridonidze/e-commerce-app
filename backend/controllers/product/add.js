const fs = require('fs'); //importing fs to read/decode images
const db = require('../../utils/db'); //importing db utility
const NewProductSchema = require('../../schemas/NewProductSchema');//importing product zod schema

async function add(req,res) {

    const data = req.body; //defining request data

    const parsedRequest = {
        name : data.name.toString(),
        description : data.description.toString(),
        price : Number(data.price),
        salesPrice : data.salesPrice === "null" || data.salesPrice === undefined ? null : Number(data.salesPrice),
        category : data.category.toString(),
        subCategory : data.subCategory.toString(),
        amount :  Number(data.amount),
        date : data.date
    };//forming request data for zod validator

    const validateProduct = NewProductSchema(parsedRequest);//passing data to validator
    if(!validateProduct.success) return res.status(400).json({message : 'Invalid Input'}); //returning error message if zod validation fails

    try{
        
        const files = req.files;//defining images of product
        const filesBuffer = await Promise.all(files.map(file => fs.promises.readFile(file.path))); //reading images
        const base64 = filesBuffer.map(buffer => buffer.toString("base64"));//converting images into base64 format 

        await db.query('insert into products (id, images, title, description , category , subcategory , price, sales_price, amount , date) values (?,?,?,?,?,?,?,?,?,?)' , [req.user.userId , [JSON.stringify(base64)] , parsedRequest.name , parsedRequest.description , parsedRequest.category , parsedRequest.subCategory, parsedRequest.price , parsedRequest.salesPrice, parsedRequest.amount , parsedRequest.date]);//inserting product data into table
        return res.status(200).json({message : 'Product Created Successfully'}); //returning success message 

    }catch(err){
        return res.status(500).json({message : 'Could Not Create Product. Try Later'}); //returning internal error message
    };
};

module.exports = add; //exporting service