import jwt from 'jsonwebtoken'
import Physician from '../models/physicianModel.js'
import asyncHandler from 'express-async-handler'

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.physician = await Physician.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('"Non autorisé, le token a échoué"')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Non autorisé, pas de token')
  }
})

const admin = (req, res, next) => {
  if (req.physician && req.physician.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error("Non autorisé en tant qu'administrateur")
  }
}

export { protect, admin }
