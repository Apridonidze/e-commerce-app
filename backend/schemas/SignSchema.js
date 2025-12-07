const z = require('zod')


const SignSchema = z.object({
    name : z.string().min(5).max(55),
    email: z.email(),
    phoneNumber: z.string().min(8).max(15),
    password: z.string().min(),
})

function validateSign (data) {
    return SignSchema.safeParse(data)
}

module.exports = validateSign