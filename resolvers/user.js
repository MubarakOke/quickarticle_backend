const db= require('../models')
const signToken= require('../utils/signToken')

const userResolver= {
    Query: {
        allUsers: async (_, args, {authUser})=> {
            if (!authUser){ // check user authentication
                throw new Error("User has no access, please log in")
            }
            return await db.User.findAll()
        },
        getUser: async (_, {id}, context)=> await db.User.findById(id)
    },
    Mutation:{
        login: async (_, {email, password})=> {
            // Find user
            const user = await db.User.findOne({where : {email}})
            if(!user || !await user.checkPassword(password, user.password)){ // check password
                throw new Error("invalid login credentials")
            }
            // Generate token
            const token= signToken(user.id)
            return {token, user}
        },
        createUser: async(root, {firstName, lastName, middleName, email, password}, context)=>{
            // Create user
            const user= await db.User.create({firstName, lastName, middleName, email, password})
            // Generate token
            const token= signToken(user.id)
            return {token, user}
        },
        updateUser: async (_, {id, firstName, lastName, middleName}, {authUser})=>{
            if (!authUser){ // check user authentication
                throw new Error("User has no access, please log in")
            }
            // Find user
            const user= await db.User.findByPk(id)
            if (!user){
                throw new Error("User not found")
            }
            user.firstName= firstName || user.firstName
            user.lastName= lastName || user.lastName
            user.middleName=  middleName || user.middleName
            await user.save()
            return user
        }
    }
}

module.exports= userResolver