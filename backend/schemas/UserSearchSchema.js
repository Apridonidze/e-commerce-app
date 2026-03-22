const z = require('zod')

const SearchSchema = z.object({
    targetUser : z.string().nonempty().max(25)
})

function UserSearchSchema (data) {
    
    return SearchSchema.safeParse(data)
}


module.exports = UserSearchSchema