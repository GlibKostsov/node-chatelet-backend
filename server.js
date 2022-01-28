import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
//custom error handling middleware
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import bodyParser from 'body-parser'
import patientRoutes from './routes/patientRoutes.js'

//reads .env file and assigns to process.env
dotenv.config()
//connecting to MongoDB Atlas server
connectDB()

//initializing express server
const app = express()

//adding bodyparser middleware to parse incoming requests bodies
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('API is running...')
})

//patients routes
app.use('/api/patients', patientRoutes)

app.use(notFound)

app.use(errorHandler)

//port number the server is listening on
const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} on port ${PORT}`.green)
)
