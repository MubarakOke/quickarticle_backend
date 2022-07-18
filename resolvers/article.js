const db= require('../models')

const articleResolver= {
    Query: {
        allArticles: async (_, args, {authUser})=> {
            if (!authUser){ // check user authentication
                throw new Error("User has no access, please log in")
            }
            return await db.Article.findAll()
        },

        getArticle: async (_, {id}, context)=> await db.Article.findByPk(id)
    },

    Mutation:{
        createArticle: async(_, {title, description}, {authUser})=>{
            if (!authUser){ // check user authentication
                throw new Error("User has no access, please log in")
            }
            const article= await db.Article.create({title, userId:authUser, description})
            return article
        },

        updateArticle: async (_, {id, title, description}, {authUser})=>{
            if (!authUser){ // check user authentication
                throw new Error("User has no access, please log in")
            }
            const article= await db.Article.findByPk(id)
            if(!article){
                throw new Error("Article does not exist")
            }
            if(article.userId != authUser){
                throw new Error("User can only update their own article")
            }
            article.title= title || article.title
            article.description= description || article.description
            await article.save()
            return article
        },

        deleteArticle: async (_, {id, firstName, lastName, middleName}, {authUser})=>{
            if (!authUser){ // check user authentication
                throw new Error("User has no access, please log in")
            }
            const article= await db.Article.findByPk(id)
            if(!article){
                throw new Error("Article does not exist")
            }
            if(article.userId != authUser){
                throw new Error("User can only delete their own article")
            }
            try{
                await article.destroy()
                return true
            }
            catch (err){
                throw new Error("unable to delete article")
            }
  
        },
    }
}

module.exports= articleResolver