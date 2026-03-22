const db = require('../../utils/db');//importing db middleware

async function me(req,res) {
    try{

        const id = req.user.userId;//definig user id from validateToken middleware (implemented in se)

        const [ user ] = await db.query('select users.id ,users.fullname, users.email,country_code, users.phone ,admin.id as admin_id from users left join admin on admin.id = users.id where users.id = ?' , [ id ]); //fetching users data based on decrypted token' user_id
    
        if(user.length === 0) return res.status(404).json({errMessage : "User Not Found" , user : null}); //returning 404 status code error if user not found
        return res.status(200).json({message : 'User Found' , user : user[0] , role : user[0].admin_id ? 'admin' : 'user'}); //returnign user data back to user if found with 200 status code 

    }catch(err){
        return res.status(500).json({message : 'Could Not Fetch User Data. Try Later' });
    };
};


module.exports = me;//exporting service