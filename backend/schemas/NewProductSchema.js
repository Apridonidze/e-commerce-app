const z = require('zod'); //importing zod

const categoryList = ["Electronics" , "Home & Living" , "Fashion" , "Beauty & Personal Care", "Sports & Outdoors" , "Automotive", "Kids & Toys"];
const subCategoryList = ["Smartphones & Accessories","Laptops & Computers","PC Parts & Components","Gaming Consoles","Audio & Headphones","Smart Home","Kitchen & Dining","Home Decor","Lighting","Cleaning Appliances","Men's Clothing","Women's Clothing","Shoes","Accessories","Watches & Jewelry", "Skincare","Haircare","Makeup","Grooming Tools", "Fitness Equipment","Outdoor Gear","Sportswear","Cycling Accessories", "Car Accessories","Auto Parts","Motorcycle Gear","Toys","Cameras & Drones","Furniture","Baby Essentials","Kids Clothing"]; //array of allowed categories and subcategories

const NewProductSchema = z.object({
    name : z.string().min(3),
    description : z.string().nonempty(),
    price : z.number().max(100000).min(0),
    salesPrice : z.number().max(100000).min(0).nullable().optional(),
    category : z.enum(categoryList),
    subCategory: z.enum(subCategoryList),
    amount : z.number().max(100000).min(0),
    date : z.string().length(10).nonempty(),
}); //definign shcema for products

function ValidateNewProduct (data) {return NewProductSchema.safeParse(data)}; //data validator function

module.exports = ValidateNewProduct; //exporting function