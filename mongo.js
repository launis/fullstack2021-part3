import mongoose from 'mongoose';


if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

console.log(password)

const url =
  `mongodb+srv://fullstack:${password}@cluster0.cnunu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
mongoose.connect(url)



const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: "Juho Kustinen", 
    number: "040-123456",
    id: 1,
})


person.save().then(response => {
  console.log('person saved!')
  mongoose.connection.close()
})