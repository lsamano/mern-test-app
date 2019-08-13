import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import logger from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './router'

const app = express()

dotenv.config()
const API_PORT = process.env.PORT || 3000
const DB_URI = process.env.DB_URI

mongoose.connect( DB_URI, { useNewUrlParser: true } )

const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(cors())

app.use('/api', router)

app.listen(API_PORT, () => console.log(`Success! Listening on port ${API_PORT}`))
