import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'

import physicians from './data/physicians.js'
import patients from './data/patients.js'

import Patient from './models/patientModel.js'
import Physician from './models/physicianModel.js'
import Treatment from './models/treatmentModel.js'

import connectDB from './config/db.js'

dotenv.config()

connectDB()

//inserts sample data to MongoDB Atlas
const importData = async () => {
  try {
    //clears everything in db
    await Treatment.deleteMany()
    await Physician.deleteMany()
    await Patient.deleteMany()

    //creates array of Physicians and inserts to db
    const createdPhysicians = await Physician.insertMany(physicians)
    //gets first physician id
    const randomPhysician = createdPhysicians[0]._id
    //creates array of patients
    const samplePatients = patients.map((patient) => {
      return { ...patient, physician: randomPhysician }
    })
    //inserts patients array to db
    await Patient.insertMany(samplePatients)

    console.log('Data Imported to Database!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    //exit with failure
    process.exit(1)
  }
}

//removes sample data from MongoDB Atlas
const destroyData = async () => {
  try {
    //clears everything in db
    await Treatment.deleteMany()
    await Physician.deleteMany()
    await Patient.deleteMany()

    console.log('Data Removed From Database!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    //exit with failure
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else if (process.argv[2] === '-i') {
  importData()
}
