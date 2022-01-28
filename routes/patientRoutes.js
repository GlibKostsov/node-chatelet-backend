import express from 'express'
import asyncHandler from 'express-async-handler'
//creates router object
const router = express.Router()
import Patient from '../models/patientModel.js'

///Patients Routes

// @desc    Returns all patients
// @route   GET /api/patients/
// @access  Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const patients = await Patient.find({})
    res.json(patients)
  })
)

// @desc    Returns single patient by id
// @route   GET /api/patients/:id
// @access  Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const patient = await Patient.findById(req.params.id)
    //if patient found returns in json
    if (patient) {
      res.json(patient)
    } else {
      //if patient not fount responds with 404 error
      res.status(404)
      throw new Error('Patient not found')
    }
  })
)

export default router
