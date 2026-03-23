const z = require('zod'); //importing zod

const ParamsSchema = z.object({
    status: z.string().nonempty(),
    offset : z.number()
}); //defining schema

function validateParams (data) {return ParamsSchema.safeParse(data)}; //validating data

module.exports = validateParams;//exporting function