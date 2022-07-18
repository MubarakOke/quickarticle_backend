const app= require('./app');
const { ApolloServer}= require('apollo-server-express')
const db= require('./models')
const typeDefs= require('./schema')
const resolvers= require('./resolvers')
const dotenv = require('dotenv')
const authorize= require('./utils/authorize')
dotenv.config({path: './config.env'})


const server= new ApolloServer({ introspection: true, 
                                playground: true,
                                cache: "bounded", 
                                typeDefs, 
                                resolvers,
                                csrfPrevention: true,
                                context: async ({req})=>{
                                    const decodedID= await authorize(req)
                                    return {authUser: decodedID}
                                }
                                })

server.start().then(()=>{
    server.applyMiddleware({app})
})

app.listen(process.env.PORT, async ()=>{
    console.log(`App running on port ${process.env.PORT}`)
    try{
        await db.sequelize.authenticate()
        console.log("Database connection successful")
    }
    catch(err){
        console.log("Database connection unsuccessful")
        console.log("Error", err)
    }
})
