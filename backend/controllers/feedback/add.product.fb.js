const z = require('zod')
const db = require('../../utils/db')

async function addByProdId(req,res) {

    const data = req.body
    const prodId = req.params.id
    
    const Schema = z.object({
        content : z.string().min(0).max(255),
        star : z.number().min(0).max(5),
        prodId : z.number().min(0)
    }); 
            
    function validateParams (data) {return Schema.safeParse(data)};
            
    const validateParamsResponse = validateParams({content : data.content, star : Number(data.star), prodId: Number(prodId)}); 
    if(!validateParamsResponse.success) return res.status(400).json({message: "Invalid Credidentials"}); 

    try{
        
        await db.query('insert into feedback (id, content, stars, product_id, type) values (?, ?, ?, ?, ?)' , [req.user.userId , data.content, data.star, prodId, 'product'])
        return res.status(200).json({message : "Feedback Sent Succesfully"})

    }catch(err){
        return res.status(500).json({errMessage : "Could Not Send Feedback. Try Later"})
    }
}

module.exports = addByProdId