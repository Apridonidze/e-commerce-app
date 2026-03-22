const db = require('../../utils/db')

async function add(req, res) {
    try {

        const items = req.body.itemsIds
        const address = req.body.address
        const totalPrice = req.body.totalPrice
        
        const [order] = await db.query('insert into orders (user_id, total_price, status, address) values (?, ?, ?, ?)',[req.user.userId, totalPrice, 'Pending', address])

        await Promise.all(
            items.map(async (item) => {
                await db.query('insert into ordered_items (order_id, product_id, amount, price) values (?, ?, ?, ?)',[order.insertId, item.product_id, item.amount, item.price])
                await db.query('update products set amount = amount - ? where products_id = ?',[item.amount, item.id])
            })
        )

        await db.query('delete from cart where id = ?',[req.user.userId])

        return res.status(200).json({message: "Your Items Have Been Ordered Successfully, Wait For Delivery"})

    } catch (err) {
        // add err on this sql error ER_NO_REFERENCED_ROW_2 and ER_DUPLICATE
        console.log(err)
        return res.status(500).json({errMessage: "Internal Error",err: err})
    }
}

module.exports = add