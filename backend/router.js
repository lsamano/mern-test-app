import express from 'express'
const router = express.Router()

import projectController from './controllers/projectController'
import userController from './controllers/userController'
import donationController from './controllers/donationController'
import authController from './controllers/authController'

// Auth 
router.post('/login', authController.login)

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
