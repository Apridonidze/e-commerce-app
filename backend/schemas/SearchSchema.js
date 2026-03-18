const z = require('zod')

const SearchSchema = z.object({
    searchItem : z.string().nonempty().max(25),
    type : z.enum(["" , "sales"])
})

function SearchSchemaValidation (data) {
    
    return SearchSchema.safeParse(data)
}


module.exports = SearchSchemaValidation