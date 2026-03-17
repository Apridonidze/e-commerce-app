const fs = require('fs')
const db = require('../../middlewares/db')
const NewProductSchema = require('../../schemas/NewProductSchema')

async function add(req,res) {

    const data = req.body;    

    const parsedRequest = {
        name : data.name.toString(),
        description : data.description.toString(),
        price : Number(data.price),
        salesPrice : Number(data.salesPrice),
        category : data.category.toString(),
        subCategory : data.subCategory.toString(),
        amount :  Number(data.amount),
        date : data.date
    };

    const validateProduct = NewProductSchema(parsedRequest);


    if(!validateProduct.success) return res.status(400).json({errMessage : 'Invalid Input'})

    try{
        
        const files = req.files;
        const filesBuffer = await Promise.all(files.map(file => fs.promises.readFile(file.path)));
        const base64 = filesBuffer.map(buffer => buffer.toString("base64"))

        await db.query('insert into products (id, images, title, description , category , subcategory , price, sales_price, amount , date) values (?,?,?,?,?,?,?,?,?,?)' , [req.user.userId , [JSON.stringify(base64)] , parsedRequest.name , parsedRequest.description , parsedRequest.category , parsedRequest.subCategory, parsedRequest.price , parsedRequest.salesPrice, parsedRequest.amount , parsedRequest.date])
        return res.status(200).json({message : 'product added succsefully' , productDetails : `${data.name}${data.description}${data.category}${data.subCategory}`})

    }catch(err){
        console.log(err)
        return res.status(500).json({errMessage : 'Internal Error'  , err : err})
    }
   
}

module.exports = add;