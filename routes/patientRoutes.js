import express from 'express'

//creates router object
const router = express.Router()

import {
  getPatients,
  getPatientById,
} from '../controllers/patientController.js'

router.route('/').get(getPatients)

// @desc    Returns single patient by id
// @route   GET /api/patients/:id
// @access  Public
router.get('/:id', getPatientById)

export default router
