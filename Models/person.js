import mongoose from 'mongoose'
import dotenv  from "dotenv"
dotenv.config()

const url = process.env.MONGODB_URI
console.log('person process.env.MONGODB_URI',process.env.MONGODB_URI)
console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number,
})


personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


export default mongoose.model('Person', personSchema)