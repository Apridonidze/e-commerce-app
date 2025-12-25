const z = require('zod')

const SearchSchema = z.object({
    searchItem : z.string().nonempty().max(25)
})

function SearchSchemaValidation (data) {

    return SearchSchema.safeParse(data)

}


module.exports = SearchSchemaValidation()