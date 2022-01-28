import mongoose from 'mongoose'

// const nameSchema = mongoose.Schema({
//   first: { type: String, required: true },
//   last: { type: String, required: true },
// })

// const locationSchema = mongoose.Schema({
//   city: { type: 'String', required: true },
//   country: { type: 'String', required: true },
//   postcode: { type: 'Integer', required: true },
// })

const patientSchema = mongoose.Schema(
  {
    physician: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Physician',
    },
    gender: {
      type: String,
      required: true,
    },

    name: {
      first: { type: String, required: true },
      last: { type: String, required: true },
    },

    location: {
      street: {
        number: { type: Number, required: true },
        name: { type: String, required: true },
      },
      city: { type: String, required: true },
      country: { type: String, required: true },
      postcode: { type: Number, required: true },
      coordinates: {
        latitude: { type: String, required: false },
        longitude: { type: String, required: false },
      },
    },

    registered: {
      date: { type: String, required: true },
      age: { type: Number, required: true },
    },

    picture: {
      medium: { type: String, required: true },
    },
    nat: { type: String, required: true },

    treatments: [
      {
        treatment: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Treatment',
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Patient = mongoose.model('Patient', patientSchema)

export default Patient
