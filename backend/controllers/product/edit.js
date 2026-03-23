const fs = require('fs'); //importing fs for image reading
const db = require('../../utils/db');  //importing db utility
const NewProductSchema = require('../../schemas/NewProductSchema'); //importing zod shechea,

async function edit(req,res) {

    const { id } = req.params;
    const data = req.body; //defining data from request

    const parsedRequest = {
        name : data.name.toString(),
        description : data.description.toString(),
        price : Number(data.price),
        salesPrice : data.salesPrice === "null" || data.salesPrice === undefined ? null : Number(data.salesPrice),
        category : data.category.toString(),
        subCategory : data.subCategory.toString(),
        amount :  Number(data.amount),
        date : data.date
    }; //formating data for zod validator

    const validateProduct = NewProductSchema(parsedRequest);//mounting zod validator function
    if(!validateProduct.success) return res.status(400).json({message : 'Invalid Input'}); //returning error message if validator fails

    try{
        
        const files = req.files || [];// defining images
        const filesBuffer = await Promise.all(files.map(file => fs.promises.readFile(file.path))); //reading images with fs
        const base64 = filesBuffer.map(buffer => buffer.toString("base64")); //converting images into base64 format

        const [ rows ] = await db.query('update products set images = ?, title = ?, description = ?, category = ?, subcategory = ?, price = ?, sales_price = ?, amount = ?,  date = ? WHERE products_id = ?' , [[JSON.stringify(base64)] , parsedRequest.name , parsedRequest.description , parsedRequest.category , parsedRequest.subCategory, parsedRequest.price , parsedRequest.salesPrice, parsedRequest.amount , parsedRequest.date , Number(id)]); //updating table

        if(rows.affectedRows === 0) return res.status(404).json({message : "Product Not Found"}); //returning 404 status code if affected rows are zero
        return res.status(200).json({message : 'Product Edited Successfully'}); //returning 200 status code response

    }catch(err){
        return res.status(500).json({message : 'Could Not Edit Product. Try Later'}); //returning internal error mesage
    };
};

module.exports = edit; //exprorting service