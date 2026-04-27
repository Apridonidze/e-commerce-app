const db = require('../../utils/db');

async function getStockOverview(req, res) {
    let { offset = 0, limit = 15 } = req.query;

    offset = Number(offset);
    limit = Number(limit);

    if (Number.isNaN(offset) || offset < 0) {
        return res.status(400).json({ message: "Invalid offset" });
    }

    if (Number.isNaN(limit) || limit <= 0) {
        return res.status(400).json({ message: "Invalid limit" });
    }

    try {

        const query = `select products_id, images, title, description, category, subcategory, price, sales_price, amount, case when amount = 0 THEN 'out' when amount between 1 and 6 then 'low' else 'ok' end as stock_status from products where amount < 7 order by amount asc limit ?, ?`;

        const [rows] = await db.query(query, [offset, limit]);

        if (rows.length === 0) return res.status(204).send();

        const grouped = { out: [], low: [],};

        for (const item of rows) {
            if (item.stock_status === 'out') {
                grouped.out.push(item);
            } else if (item.stock_status === 'low') {
                grouped.low.push(item);
            }
        }

        return res.status(200).json({message: "Stock overview fetched successfully", data: grouped});

    } catch (err) {
        console.log(err)
        return res.status(500).json({message: "Could not fetch stock overview"});
    };
};

module.exports = getStockOverview;