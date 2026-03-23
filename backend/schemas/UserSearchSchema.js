const z = require('zod'); //importing zod

const SearchSchema = z.object({
    targetUser : z.string().nonempty().max(25)
}); //definign search shcema

function UserSearchSchema (data) {return SearchSchema.safeParse(data)}; //validating data

module.exports = UserSearchSchema; //exporting schema