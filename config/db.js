import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    //trying to initiate the connction with MongoDB Atlas
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    //if successful prints Mongo Atlas host in cyan color
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan)
  } catch (err) {
    //if error prints error message and exits
    console.log(`Error: ${err.message}`.red)
    //terminates all node.js processes
    process.exit(1)
  }
}

export default connectDB
