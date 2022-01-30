import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import Physician from '../models/physicianModel.js'

// @desc    Auth physician & get token
// @route   POST /api/physicians/login
// @access  Public
const authPhysician = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const physician = await Physician.findOne({ email })

  if (physician && (await physician.matchPassword(password))) {
    res.json({
      _id: physician._id,
      name: physician.name,
      email: physician.email,
      isAdmin: physician.isAdmin,
      token: generateToken(physician._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc    Register a new physician
// @route   POST /api/physicians
// @access  Public
const registerPhysician = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const physicianExists = await Physician.findOne({ email })

  if (physicianExists) {
    res.status(400)
    throw new Error('Physician already exists')
  }

  const physician = await Physician.create({
    name,
    email,
    password,
  })

  if (physician) {
    res.status(201).json({
      _id: physician._id,
      name: physician.name,
      email: physician.email,
      isAdmin: physician.isAdmin,
      token: generateToken(physician._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Get physician profile
// @route   GET /api/physicians/profile
// @access  Private
const getPhysicianProfile = asyncHandler(async (req, res) => {
  const physician = await Physician.findById(req.physician._id)

  if (physician) {
    res.json({
      _id: physician._id,
      name: physician.name,
      email: physician.email,
      isAdmin: physician.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('Physician not found')
  }
})

export { authPhysician, registerPhysician, getPhysicianProfile }