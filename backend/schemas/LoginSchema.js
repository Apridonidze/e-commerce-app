const z = require('zod')

const LoginSchema = z.object({
    email: z.email(),
    password : z.string()
})

function validateLogin (data) {
    return LoginSchema.safeParse(data)
}


module.exports = validateLogin