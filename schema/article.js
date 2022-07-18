const { gql } = require('apollo-server-express')

const articleSchema= gql`
    type Article{
        id: Int!
        title: String!
        userId : Int!
        description: String!
        createdAt: DateTime!
        updatedAt: DateTime!
    }
    extend type Query{
        allArticles: [Article]
        getArticle(id: Int!): Article
    }
    extend type Mutation{
        createArticle(title: String!, description: String!): Article
        updateArticle(id: Int!, title: String!, description: String!): Article
        deleteArticle(id: Int!): Boolean
    }
`
module.exports= articleSchema