const z = require('zod')

const db = require('../../utils/db')

async function add(req,res) {
    
    const data = req.body.data

    const Schema = z.object({
        content : z.string().min(0).max(255),
        stars : z.number().min(0).max(5),
        type : z.enum('product', 'platform')
    }); 
        
    function validateParams (data) {return Schema.safeParse(data)};
        
    const validateParamsResponse = validateParams({content : data.content, stars : Number(data.stars), type: data.type}); 
    if(!validateParamsResponse.success) return res.status(400).json({message: "Invalid Credidentials"}); 

    try{

        await db.query('insert into feedback (id, content, stars, type) values (?,?,?,?)' , [req.user.userId , data.content, data.stars, data.type])
        return res.status(200).json({message : "Feedback Sent Succesfully"})

    }catch(err){
        return res.status(500).json({errMessage : "Could Not Send Feedback. Try Later"})
    }
}

module.exports = add