const z = require('zod'); //importing zod

const SignSchema = z.object({
    name : z.string().min(5),
    email: z.email(),
    phoneNumber: z.string().min(9),
    password: z.string(),
}); //defining sign schema

function validateSign (data) {return SignSchema.safeParse(data)}; //data validator schema

module.exports = validateSign; //exporting function 