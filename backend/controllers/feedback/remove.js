const db = require('../../utils/db'); //importing db utility

async function remove(req,res) {
    try{

        const { feedbackId } = req.params; //defining request params
        if (Number.isNaN(feedbackId) || feedbackId < 0) {return res.status(400).json({ message: "Invalid Feedback It Provided" })}; //validating request param

        const [ response ] = await db.query('delete from feedback where feedback_id = ?', [Number(feedbackId)]); //executing query
        if(response.affectedRows === 0) return res.status(404).json({message : "Feedback Not Found"}); //returning 404 status code if response had 0 affected rows (means feedback could not be found)

        return res.status(200).json({message : "Feedback Removed Successfuly" , feedbackId});//returning success message

    }catch(err){
        return res.status(500).json({message : "Could Not Remove Feedback. Try Later"}); //returning internal error message
    };
};

module.exports = remove;//exporting service