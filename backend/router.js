import express from 'express'
const router = express.Router()

import projectController from './controllers/projectController'
import userController from './controllers/userController'
import donationController from './controllers/donationController'

const { OAuth2Client } = require('google-auth-library');
import User from './models/user';

const CLIENT_ID = process.env.CLIENT_ID
const client = new OAuth2Client(CLIENT_ID);

async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID
  });
  const payload = ticket.getPayload();
  return payload
}


router.post('/login', async (req, res) => {
  const payload =  await verify(req.body.token).catch(console.error);
  const userId = payload['sub'];

  User.findOne({ googleId: userId }, 'username bio createdAt', (error, user) => {
    // Error Handling
    if ( error ) return res.json({ success: false, error })

    // No User Found
    if ( !user ) {
      return res.json({ success: false, error: "No user found."})
      // This is a new user, add them to the backend.
    }
    return res.json( user )
  })


})

// User
router.get('/users', userController.index)
router.post('/users', userController.create)
router.get('/users/:id', userController.show)
router.put('/users/:id', userController.update)
router.delete('/users/:id', userController.destroy)

// Donation
router.get('/donations', donationController.index)
router.post('/donations', donationController.create)
router.get('/donations/:id', donationController.show)
router.put('/donations/:id', donationController.update)
// TODO: Need delete to also refund donation

// Project
router.get('/projects', projectController.index)
router.post('/projects', projectController.create)
router.get('/projects/:id', projectController.show)
router.put('/projects/:id', projectController.update)
router.delete('/projects/:id', projectController.destroy)
// TODO: Need to refund all backers

export default router
