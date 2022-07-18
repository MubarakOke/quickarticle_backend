const { gql } = require('apollo-server-express')
const userSchema= require('./user')
const articleSchema= require('./article')

const baseSchema= gql`
    scalar DateTime
    type Query{
        _:Boolean
    }

    type Mutation{
        _:Boolean
    }
`

module.exports= [baseSchema, userSchema, articleSchema]