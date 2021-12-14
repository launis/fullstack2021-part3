import mongoose from 'mongoose'


if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

if (process.argv.length===4) {
  console.log('give both name and number')
  process.exit(1)
}

if (process.argv.length>5) {
  console.log('too many arguments')
  process.exit(1)
}

const password = process.argv[2]
const url =
  `mongodb+srv://fullstack:${password}@cluster0.cnunu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
mongoose.connect(url)
console.log(url)
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
})
const Person = mongoose.model('Person', personSchema)


const generateId = () => {
  const id = Math.round(Math.random() * 1000)
  return id
}

if (process.argv.length===3) {
  console.log(`phonebook:`)
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}
else {
  const person = new Person({
    name: process.argv[3], 
    number: process.argv[4],
    id: generateId(),
  })
  person.save().then(response => {
    console.log('person saved!')
    mongoose.connection.close()
  })
}