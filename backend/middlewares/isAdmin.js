const db = require('../utils/db'); //importing db utility

async function isAdmin ( req , res , next) {
    try{

        const id = req.user.userId; //defining userId from validateToekn middleware

        const [rows] = await db.query(`select users.id, admin.id from users left join admin on users.id = admin.id where users.id = ?`, [id]);

        if (rows.length === 0) return res.status(404).json({message: "User Not Found",isAdmin: false});//returning 404 status error if usser is not found
        if (!rows[0].admin_id) return res.status(403).json({message: "Access Declined",isAdmin: false}); //returning 403 status error if user is found but not in admin list

        req.user.isAdmin = true; //setting req.user.isAdmin to true after

        next(); //calling api after middleware  finished its work

    }catch(err){
        return res.status(500).json({message : "Could Not Validate Admin"}); //returning errorr message
    };
};

module.exports = isAdmin; //exporting middleware