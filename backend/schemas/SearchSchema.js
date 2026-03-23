const z = require('zod'); //importing zod

const SearchSchema = z.object({
    searchItem : z.string().nonempty().max(25),
    type : z.enum(["" , "sales"])
}); //defining schema

function SearchSchemaValidation (data) {return SearchSchema.safeParse(data)}; //validating data

module.exports = SearchSchemaValidation; //exporting schema