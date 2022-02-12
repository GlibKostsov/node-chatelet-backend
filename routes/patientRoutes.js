import express from 'express'

//creates router object
const router = express.Router()

import {
  getPatients,
  getPatientById,
} from '../controllers/patientController.js'

import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(protect, admin, getPatients)

// @desc    Returns single patient by id
// @route   GET /api/patients/:id
// @access  Public
router.get('/:id', protect, admin, getPatientById)

export default router
