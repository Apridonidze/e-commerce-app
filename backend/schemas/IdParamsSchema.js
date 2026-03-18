const z = require('zod')

const idSchema = z.object({
    id : z.number(),
})

function IdParamsSchema (data) {
    return idSchema.safeParse({id : Number(data)})
}

module.exports = IdParamsSchema