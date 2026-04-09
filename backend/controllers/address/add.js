const db = require('../../utils/db'); //importing db utility

async function add (req,res){
    
    const { address, apartment, city, province, state, zipcode } = req.query;
    const errors = {};

    const addressRegex1 = /^\d+\s+[A-Za-z\s]+$/;
    const addressRegex2 = /^[A-Za-z\s]+\s+\d+$/;

    if (!address || typeof address !== "string") {
        errors.address = "Address is required.";
    } else if (!addressRegex1.test(address) && !addressRegex2.test(address)) {
        errors.address = "Address must include street number and street name (e.g. '12 Main St' or 'Main St 12').";
    }

    if (apartment && apartment.length > 10)errors.apartment = "Apartment must be less than 10 characters.";
    if (!city || city.length < 2)errors.city = "City must be at least 2 characters.";
    if (!province || province.length < 2) errors.province = "Province must be at least 2 characters.";
    if (!state || state.length < 2) errors.state = "State must be at least 2 characters.";
    if (!zipcode || !/^\d{4,10}$/.test(zipcode)) errors.zipcode = "Zipcode must be between 4–10 digits.";

    if (Object.keys(errors).length > 0) return res.status(400).json({message: "Validation failed", errors});
    

    try {

        const [row] = await db.query(`insert into address (user_id, address, apartment, city, province, state, zipcode) values (?, JSON_ARRAY(?), ?, ?, ?, ?, ?)`,[req.user.userId, address, apartment, city, province, state, zipcode]);

        if (row.affectedRows === 0)return res.status(400).json({message: "Could Not Save Your Address."});
        return res.status(200).json({message: "Address Saved Successfully"});

    } catch (err) {
        return res.status(500).json({message: "Database error occurred"});
    };
};

module.exports = add;