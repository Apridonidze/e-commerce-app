const z = require('zod'); //importing zod

const LoginSchema = z.object({
    email: z.email(),
    password : z.string()
}); //defining schema for login credidentials

function validateLogin (data) {return LoginSchema.safeParse(data)}; //data validator function

module.exports = validateLogin; //exporting schema