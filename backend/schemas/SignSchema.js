const z = require('zod')


const SignSchema = z.object({
    name : z.string().min(5),
    email: z.email(),
    phoneNumber: z.string().min(9),
    password: z.string(),
})

function validateSign (data) {
    
    return SignSchema.safeParse(data)

}

module.exports = validateSign