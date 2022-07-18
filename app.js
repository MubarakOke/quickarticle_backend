const express= require('express');
const morgan= require('morgan')
const cors= require('cors')
const helmet= require('helmet')


const app= express()

app.use(helmet())
app.use(cors())
app.options('*', cors())
app.use(morgan('dev'))
app.use(express.json())

module.exports= app
