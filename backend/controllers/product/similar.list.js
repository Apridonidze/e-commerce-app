const { default: z } = require('zod');
const db = require('../../utils/db')

async function add(req,res) {
    
    const {category, subcategory, id} = req.query; //defining query data from request
    const data = req.query; //definiing request body
   
    const categoryList = ["Electronics" , "Home & Living" , "Fashion" , "Beauty & Personal Care", "Sports & Outdoors" , "Automotive", "Kids & Toys"];
    const subCategoryList = ["Smartphones & Accessories","Laptops & Computers","PC Parts & Components","Gaming Consoles","Audio & Headphones","Smart Home","Kitchen & Dining","Home Decor","Lighting","Cleaning Appliances","Men's Clothing","Women's Clothing","Shoes","Accessories","Watches & Jewelry", "Skincare","Haircare","Makeup","Grooming Tools", "Fitness Equipment","Outdoor Gear","Sportswear","Cycling Accessories", "Car Accessories","Auto Parts","Motorcycle Gear","Toys","Cameras & Drones","Furniture","Baby Essentials","Kids Clothing"]; //defining enum options for category and subcategory
   
    const Schema = z.object({
        category : z.enum(categoryList),
        subcategory: z.enum(subCategoryList),
        id : z.coerce.number().min(0).max(99999)
    });//defining schema for requests data
    function validateParams (data) {return Schema.safeParse(data)}; //defining functuon to valdiate data with schema provided
               
    const validateParamsResponse = validateParams(data); //passing data to validator funciton 
    if(!validateParamsResponse.success) return res.status(400).json({message: "Invalid Credidentials"});  //returning error message if validation fails
   
    try{

        const [products] = await db.query('select products_id, images , title, description ,price , sales_price, amount, category, subcategory from products where category like ? and subcategory like ? and products_id != ?' , [category, subcategory, id]); //fetching products from table

        if(products.length < 1) return res.status(204).send(); //returnign 204 status code if similar products are not found
        return res.status(200).json({message : "Products Found" , products: products}); //returning similar products

    }catch(err){
        return res.status(500).json({errMessage : 'Could Not Fetch Similar Products. Try later'});//returning interal error message
    };
};

module.exports = add;//exporting service