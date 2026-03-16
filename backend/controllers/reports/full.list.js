const db = require('../../middlewares/db')

async function fullList(req, res) {
    try {

        let { offset = 0, status } = req.params
        const limit = 5

        offset = Number(offset)

        if (Number.isNaN(offset) || offset < 0) {return res.status(400).json({ message: "Invalid offset" })}
        if (status == "undefined") status = undefined

        let query = `select users.fullname, users.email, reports.*, products.title from reports join users on users.id = reports.user_id join products on reports.product_id = products.products_id`
        const params = []

        if (status) {
            query += ` where reports.status = ?`
            params.push(status)
        }

        query += ` limit ? offset ?`
        params.push(limit, offset)

        const [ReportsList] = await db.query(query, params)

        if (!ReportsList.length) return res.status(204)

        return res.status(200).json({message: "Reports Found",reports: ReportsList})

    } catch (err) {
        console.error(err)
        return res.status(500).json({message: "Internal Error"})
    }
}

module.exports = fullList