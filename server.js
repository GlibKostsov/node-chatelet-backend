const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const patients = require('./data/patients')

dotenv.config()

const app = express()

// Bodyparser Middleware
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.get('/api/patients', (req, res) => {
  res.json(patients)
})

app.get('/api/patients/:id', (req, res) => {
  const patient = patients.find((patient) => patient.id === req.params.id)
  console.log(patient)
  res.json(patient)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log('server running on port 5000'))
