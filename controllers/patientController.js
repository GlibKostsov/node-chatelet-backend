import asyncHandler from 'express-async-handler'
import Patient from '../models/patientModel.js'

// @desc    Returns all patients
// @route   GET /api/patients/
// @access  Private/Admin
const getPatients = asyncHandler(async (req, res) => {
  const patients = await Patient.find({})
  res.json(patients)
})

// @desc    Returns single patient by id
// @route   GET /api/patients/:id
// @access  Public
const getPatientById = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id)
  //if patient found returns in json
  if (patient) {
    res.json(patient)
  } else {
    //if patient not fount responds with 404 error
    res.status(404)
    throw new Error("Patient n'est pas dans la base de données.")
  }
})

export { getPatients, getPatientById }
