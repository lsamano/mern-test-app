import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import logger from 'morgan'
import cors from 'cors'
import User from './models/user'
import Donation from './models/donation'
import Project from './models/project'
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

router.get('/', (req, res) => {
  res.json({ hello: "world" })
})

// User
router.get('/users', (req, res) => {
  User.find((error, users) => {
    if (error) {
      return res.json({ success: false, error: error })
    } else {
      return res.json({ success: true, users: users })
    }
  })
})

router.get('/users/:id', (req, res) => {
  User.findById(req.params.id, (error, user) => {
    if (error) return res.json({ success: false, error })
    return res.json({ success: true, user })
  })
})

router.post('/users', (req, res) => {
  const user = new User(req.body)
  user.save((error, newUser) => {
    if (error) {
      return res.json({ success: false, error: error })
    } else {
      return res.json({ success: true, user: newUser })
    }
  })
})

router.put('/users/:id', (req, res) => {
  User.findById(req.params.id, (error, user) => {
    if (error) return res.json({ success: false, error: error })
    const { username, password, bio } = req.body
    if (username) user.username = username
    if (password) user.password = password
    if (bio) user.bio = bio
    user.save((error, savedUser) => {
      if (error) return res.json({ success: false, error: error })
      return res.json({ success: true, user: savedUser })
    })
  })
})

router.delete('/users/:id', (req, res) => {
  User.deleteOne({ _id:req.params.id }, error => {
    if (error) return res.json({ success: false, error })
    return res.json({ success: true })
  })
})

// Donation
router.get('/donations', (req, res) => {
  Donation.find()
  .populate('user')
  .populate('project')
  .exec((error, donations) => {
    if (error) {
      return res.json({ success: false, data: error })
    } else {
      return res.json({ success: true, donations: donations })
    }
  })
})

router.get('/donations/:id', (req, res) => {
  Donation.findById(req.params.id, (error, donation) => {
    if (error) return res.json({ success: false, error })
    return res.json({ success: true, donation })
  })
})

router.post('/donations', (req, res) => {
  const donation = new Donation(req.body)
  donation.save((error, newDonation) => {
    if (error) return res.json({ success: false, error: error })
    return res.json({ success: true, donation: newDonation })
  })
})

// TODO: Need delete to also refund donation

// Project
router.get('/projects', (req, res) => {
  Project.find()
  .populate('owner', ['username', 'bio'])
  .exec((error, projects) => {
    if (error) return res.json({ success: false, error: error })
    return res.json({ success: true, projects })
  })
})

router.get('/projects/:id', (req, res) => {
  Project.findById(req.params.id)
  .populate('owner', ['username', 'bio'])
  .exec((error, project) => {
    if (error) return res.json({ success: false, error })
    return res.json({ success: true, project })
  })
})

router.post('/projects', (req, res) => {
  const project = new Project(req.body)
  project.save((error, newProject) => {
    if (error) return res.json({ success: false, error: error })
    return res.json({ success: true, project: newProject })
  })
})

router.put('/projects/:id', (req, res) => {
  Project.findById(req.params.id, (error, project) => {
    if (error) return res.json({ success: false, error })
    const { name, owner, goal } = req.body
    if (name) project.name = name
    if (owner) project.owner = owner
    if (goal) project.goal = goal
    project.save((error, savedProject) => {
      if (error) return res.json({ success: false, error })
      return res.json({ success: true, project: savedProject })
    })
  })
})

router.delete('/projects/:id', (req, res) => {
  Project.deleteOne({ _id:req.params.id }, error => {
    if (error) return res.json({ success: false, error })
    return res.json({ success: true })
  })
})
// TODO: Need to refund all backers

app.use('/api', router);

app.listen(API_PORT, () => console.log(`Success! Listening on port ${API_PORT}`));
