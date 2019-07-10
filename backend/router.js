import express from 'express'
import * as projectController from './controllers/projectController'
import * as userController from './controllers/userController'
import * as donationController from './controllers/donationController'

const router = express.Router()

// User
router.get('/users', userController.index)
router.get('/users/:id', userController.show)
router.post('/users', userController.create)
router.put('/users/:id', userController.update)
router.delete('/users/:id', userController.destroy)

// Donation
router.get('/donations', donationController.index)
router.get('/donations/:id', donationController.show)
router.post('/donations', donationController.create)
// TODO: Need delete to also refund donation

// Project
router.get('/projects', projectController.index)
router.get('/projects/:id', projectController.show)
router.post('/projects', projectController.create)
router.put('/projects/:id', projectController.update)
router.delete('/projects/:id', projectController.destroy)
// TODO: Need to refund all backers

export default router
