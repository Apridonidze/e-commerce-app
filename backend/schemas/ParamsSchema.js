const z = require('zod')

const ParamsSchema = z.object({
    status: z.string().nonempty(),
    offset : z.number()
})

function validateParams (data) {
    return ParamsSchema.safeParse(data)
}


module.exports = validateParams