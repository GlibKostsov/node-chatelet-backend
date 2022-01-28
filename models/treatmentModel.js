import mongoose from 'mongoose'

const treatmentSchema = mongoose.Schema({
  name: { type: 'String', required: true },
})

const Treatment = mongoose.model('Treatment', treatmentSchema)

export default Treatment
