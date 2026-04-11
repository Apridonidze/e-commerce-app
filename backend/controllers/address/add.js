const db = require('../../utils/db');

const regions = [
        "Tbilisi",
        "Adjara",
        "Imereti",
        "Samegrelo-Zemo Svaneti",
        "Kvemo Kartli",
        "Shida Kartli",
        "Kakheti",
        "Guria",
        "Racha-Lechkhumi and Kvemo Svaneti",
        "Samtskhe-Javakheti",
        "Mtskheta-Mtianeti",
        "California",
        "Texas",
        "Florida",
        "New York",
        "Illinois",
        "Pennsylvania",
        "Ohio",
        "Georgia (US)",
        "North Carolina",
        "Michigan",
        "Bavaria",
        "Baden-Württemberg",
        "North Rhine-Westphalia",
        "Hesse",
        "Saxony",
        "Berlin",
        "Hamburg",
        "Brandenburg",
        "Lower Saxony",
        "Thuringia"
];
const regionSet = new Set(regions);

async function add(req, res) {

    const { address, apartment, city, state, zipcode } = req.body;
    const errors = {};

    const LIMITS = { address: 100, apartment: 20, city: 50, zipcode: 10};

    const addressRegex = /^(\d+\s+[a-zA-Z0-9\s]+|[a-zA-Z0-9\s]+\s+\d+)$/;
    const cityRegex = /^[a-zA-Z\s-]+$/;
    const zipRegex = /^[0-9]{3,10}$/;

    if (!address || typeof address !== "string" || !address.trim()) {
        errors.address = "Address is required.";
    } else if (address.length > LIMITS.address) {
        errors.address = `Max ${LIMITS.address} characters allowed.`;
    } else if (!addressRegex.test(address.trim())) {
        errors.address = "Format must be '12 Rustaveli' or 'Rustaveli 12'.";
    }

    if (apartment) {
        if (typeof apartment !== "string") {
            errors.apartment = "Invalid apartment format.";
        } else if (apartment.length > LIMITS.apartment) {
            errors.apartment = `Max ${LIMITS.apartment} characters allowed.`;
        } else if (apartment.length < 2) {
            errors.apartment = "Too short.";
        }
    }

    if (!city || typeof city !== "string" || !city.trim()) {
        errors.city = "City is required.";
    } else if (city.length > LIMITS.city) {
        errors.city = `Max ${LIMITS.city} characters allowed.`;
    } else if (!cityRegex.test(city.trim())) {
        errors.city = "City must contain only letters.";
    }

    if (!state || typeof state !== "string") {
        errors.state = "Region is required.";
    } else if (!regionSet.has(state)) {
        errors.state = "Invalid region selected.";
    }

    if (!zipcode || typeof zipcode !== "string") {
        errors.zipcode = "ZIP code is required.";
    } else if (zipcode.length > LIMITS.zipcode) {
        errors.zipcode = `Max ${LIMITS.zipcode} digits allowed.`;
    } else if (!zipRegex.test(zipcode.trim())) {
        errors.zipcode = "ZIP must be 3–10 digits.";
    }

    if (Object.keys(errors).length > 0) return res.status(400).json({message: "Validation failed", errors}); 

    try {

        const [row] = await db.query(`insert into address (user_id, address, apartment, city, state, zipcode) values (?, JSON_ARRAY(?), ?, ?, ?, ?)`,[req.user.userId, address.trim(), apartment || null, city.trim(), state, zipcode.trim()]);

        if (row.affectedRows === 0) return res.status(400).json({ message: "Could not save address." });        
        return res.status(200).json({ message: "Address saved successfully.", insertId : row.insertId , id : req.user.userId });

    } catch (err) {
        console.log(err )
        return res.status(500).json({ message: "Could Not Save Your Address. Try Later!" });
    };
};

module.exports = add;