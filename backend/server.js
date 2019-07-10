import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import logger from 'morgan'
import cors from 'cors'
import * as projectController from './controllers/projectController'
import * as userController from './controllers/userController'
import * as donationController from './controllers/donationController'
import dotenv from 'dotenv'

const app = express()
const router = express.Router()
dotenv.config()

const API_PORT = process.env.PORT || 3000
const DB_URI = process.env.DB_URI

mongoose.connect( DB_URI, { useNewUrlParser: true } )

var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use( bodyParser.urlencoded({ extended: false }) )
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(cors());

router.get('/test/:thing', (req, res) => {
  console.log("HAHAHSHDSHD", req)
  // res.json({ body: req.body, headers:req.headers, method: req.method, params: req.params })
  // res.send({...req.app})
})

// User
router.get('/users', userController.get_index)
router.get('/users/:id', userController.get_show)
router.post('/users', userController.post_index)
router.put('/users/:id', userController.put_show)
router.delete('/users/:id', userController.delete_show)

// Donation
router.get('/donations', donationController.get_index)
router.get('/donations/:id', donationController.get_show)
router.post('/donations', donationController.post_index)

// TODO: Need delete to also refund donation

// Project
router.get('/projects', projectController.get_index)
router.get('/projects/:id', projectController.get_show)
router.post('/projects', projectController.post_index)
router.put('/projects/:id', projectController.put_show)
router.delete('/projects/:id', projectController.delete_show)
// TODO: Need to refund all backers

app.use('/api', router);

app.listen(API_PORT, () => console.log(`Success! Listening on port ${API_PORT}`));
