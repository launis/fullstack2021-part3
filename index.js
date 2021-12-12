import express, { query } from 'express'
const app = express()

app.use(express.json())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

let persons = [
    { 
      name: "Arto Hellas", 
      number: "040-123456",
      id: 1
    },
    { 
      name: "Ada Lovelace", 
      number: "39-44-5323523",
      id: 2
    },
    { 
      name: "Dan Abramov", 
      number: "12-43-234345",
      id: 3
    },
    { 
      name: "Mary Poppendieck", 
      number: "39-23-6423122",
      id: 4
    }
  ]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
  res.send(`Phonebook has information for ${persons.length} people <br><br> ${Date()}`)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

const generateId = () => {
  const id = Math.random() * 100
  return id
}

app.post('/api/persons', (request, response) => {
  const body = request.body


  if (body.name === ""){
    return response.status(401).json({ 
      error: 'Name missing' 
    })
  }

  if (body.number === ""){
    return response.status(401).json({ 
      error: 'Number missing' 
    })
  }

  const same = persons.find(person => person.name === body.name)
  if (same){
    return response.status(401).json({ 
      error: `${body.name} Name already exists`
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }


  persons = persons.concat(person)

  response.json(person)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})