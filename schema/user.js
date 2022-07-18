const { gql } = require('apollo-server-express')

const userSchema= gql`
    type User{
        id: Int!
        firstName: String!
        lastName: String!
        middleName: String
        email: String!
        createdAt: DateTime!
        updatedAt: DateTime!
    }
    type TokenUser{
        token:String!,
        user: User!
    }
    extend type Query{
        allUsers: [User]
        getUser(id: Int!): User
    }
    extend type Mutation{
        login(email: String!, password: String!): TokenUser
        createUser(firstName: String!, lastName: String!, middleName: String, email: String!, password: String!): TokenUser
        updateUser(id: Int!, firstName: String, lastName: String, middleName: String): User
    }
`
module.exports= userSchema