import express from 'express'

//creates router object
const router = express.Router()

//db communication
import {
  authPhysician,
  getPhysicianProfile,
  registerPhysician,
} from '../controllers/physicianController.js'

//authorization middleware
import { protect } from '../middleware/authMiddleware.js'

//create new physician route
router.route('/').post(registerPhysician)
//login physician route
router.post('/login', authPhysician)
//get physician profile route
router.route('/profile').get(protect, getPhysicianProfile)

export default router
