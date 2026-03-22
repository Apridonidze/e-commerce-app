const fs = require('fs')
const db = require('../../utils/db')
const NewProductSchema = require('../../schemas/NewProductSchema')

async function edit(req,res) {

    const { id } = req.params;
    const data = req.body;    

    const parsedRequest = {
        name : data.name.toString(),
        description : data.description.toString(),
        price : Number(data.price),
        salesPrice : data.salesPrice === "null" || data.salesPrice === undefined ? null : Number(data.salesPrice),
        category : data.category.toString(),
        subCategory : data.subCategory.toString(),
        amount :  Number(data.amount),
        date : data.date
    };

    const validateProduct = NewProductSchema(parsedRequest);
    if(!validateProduct.success) return res.status(400).json({errMessage : 'Invalid Input'})

    try{
        
        const files = req.files || [];
        const filesBuffer = await Promise.all(files.map(file => fs.promises.readFile(file.path)));
        const base64 = filesBuffer.map(buffer => buffer.toString("base64"))

        await db.query('update products set images = ?, title = ?, description = ?, category = ?, subcategory = ?, price = ?, sales_price = ?, amount = ?,  date = ? WHERE products_id = ?' , [[JSON.stringify(base64)] , parsedRequest.name , parsedRequest.description , parsedRequest.category , parsedRequest.subCategory, parsedRequest.price , parsedRequest.salesPrice, parsedRequest.amount , parsedRequest.date , Number(id)])
        return res.status(200).json({message : 'product edited succsefully' , productDetails : `${data.name}${data.description}${data.category}${data.subCategory}`})

    }catch(err){
        return res.status(500).json({errMessage : 'Internal Error'  , err : err})
    }
   
}

module.exports = edit;