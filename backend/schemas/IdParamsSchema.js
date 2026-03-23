const z = require('zod'); //importing zod

const idSchema = z.object({
    id : z.number(),
}); //defining schema for id

function IdParamsSchema (data) {return idSchema.safeParse({id : Number(data)});};//schema validator function

module.exports = IdParamsSchema; //exporting schema