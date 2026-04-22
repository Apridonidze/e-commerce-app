const db = require('../../utils/db')

async function charts(req,res){
    const { chartsDate } = req.params

    // validate req.params
    try{


        const baseQuery = 'select ordered_items.product_id, ordered_items.amount, orders.created_at, products.title, products.category, products.subcategory, products.price, products.sales_price from ordered_items join orders on ordered_items.order_id = orders.order_id join products on products.products_id = ordered_items.product_id'

        let dateParams;

        if(chartsDate === 'Month'){
            dateParams = ' where orders.created_at between date_sub(now(), interval 1 month) and now() order by orders.created_at desc'
        }else {
            dateParams = ' where orders.created_at between date_sub(now(), interval 1 week) and now() order by orders.created_at desc'
        }


        const [ soldItems ] = await db.query(baseQuery + dateParams); //selecting sold items to generate charts data for admin dashobard
        const [ totalUsers ] = await db.query('select count(*) from users')
        const [ totalRevenue ] = await db.query('select sum(total_price) , count(*) from orders where status = "Delivered"')
        
        const getRevenue = (curr) => curr.amount * (curr.sales_price ?? curr.price);

        const salesOverTime = Object.values(
            soldItems.reduce((acc, curr) => {
                const date = curr.created_at.toISOString?.().split("T")[0] || curr.created_at.split("T")[0];

                if (!acc[date]) acc[date] = { date, sales: 0, revenue: 0 };

                acc[date].sales += curr.amount;
                acc[date].revenue += getRevenue(curr);

                return acc;
            }, {})
        );

        const bestSellingProducts = Object.values(
            soldItems.reduce((acc, curr) => {
                if (!acc[curr.product_id]) {
                    acc[curr.product_id] = {
                        product_id: curr.product_id,
                        title: curr.title,
                        total_sold: 0
                    };
                };

                acc[curr.product_id].total_sold += curr.amount;

                return acc;
            }, {})
        );

        return res.status(200).json({salesOverTime, bestSellingProducts:bestSellingProducts.slice(0, 3) , totalRevenue : totalRevenue[0]['sum(total_price)'] , totalOrders : totalRevenue[0]['count(*)'] ,totalUsers : totalUsers[0]["count(*)"]})

    }catch(err){
        return res.status(500).json({message : "Could Not Load Dashboard Information. Try Later"}); //returning internal error message
    }
}

module.exports = charts