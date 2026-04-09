const z = require("zod"); //importing validator library
const db = require('../../utils/db'); //importing db utility

async function add(req, res) {

    const data = req.body; //definiing request body
    const Schema = z.object({
        itemsIds: z.array(z.object({product_id: z.coerce.number().int().positive(),amount: z.coerce.number().int().positive(),price: z.coerce.number().positive()})).nonempty(),
        address: z.string().min(5).max(255),
        totalPrice : z.coerce.number().min(40).max(99999)
    });//defining schema for requests data
            
    function validateParams (data) {return Schema.safeParse(data)}; //definign functuon to valdiate data with schema provided
            
    const validateParamsResponse = validateParams({itemsIds : data.itemsIds, address : data.address, totalPrice: Number(data.totalPrice)}); //passing data to validator funciton 
    if(!validateParamsResponse.success) return res.status(400).json({message: "Invalid Credidentials"});  //returning error message if validation fails

    try {

        const { itemsIds, address, totalPrice } = req.body; //defining data from request body
        
        const [order] = await db.query('insert into orders (user_id, total_price, status, address) values (?, ?, ?, ?)',[req.user.userId, totalPrice, 'Pending', address]);

        for (const item of itemsIds) {
            await db.query('insert into ordered_items (order_id, product_id, amount, price) values (?, ?, ?, ?)',[order.insertId, item.product_id, item.amount, Number(item.price)]);
            await db.query('update products set amount = amount - ? where products_id = ?',[item.amount, item.product_id]);
        }

        await db.query('delete from cart where id = ?',[req.user.userId]); //clearing users cart
        return res.status(200).json({message: "Your Items Have Been Ordered Successfully, Wait For Delivery"});//returning success message

    } catch (err) {
        if (err.code === 'ER_NO_REFERENCED_ROW_2') return res.status(400).json({ message: 'Order Items Not Found In Database'}); //returns 400 status message if no product is same as productid is in db
        if (err.code === 'ER_DUPLICATE') return res.status(400).json({ message: 'Duplicate Order Creation'});//returns 400 status message if order_id is duplicated in db
        return res.status(500).json({message: "Could Not Create Order. Try Later"}); //returning 500 status code error if internal error occurs
    };
};

module.exports = add; //exprting service