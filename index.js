const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(express.json())

let persons = [
  { 
    "name": "Arto Hellas", 
    "number": "040-123456",
    "id": 1
  },
  { 
    "name": "Ada Lovelace", 
    "number": "39-44-5323523",
    "id": 2
  },
  { 
    "name": "Dan Abramov", 
    "number": "12-43-234345",
    "id": 3
  },
  { 
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122",
    "id": 4
  }
]

morgan.token('jsonBody', (req, res) => JSON.stringify(req.body))

app.use(morgan('tiny'))

app.get('/', (request, response) => {
  response.send('<h1>Go to /api/persons to see what you\'re looking for</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  const currentTime = new Date()
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p>
     <p>${currentTime}</p>`
  )
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

app.post('/api/persons', (request, response) => {
  const body = request.body
  const names = persons.map(person => person.name)

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  } else if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  } else if (names.includes(body.name)) {
    return response.status(400).json({ 
      error: 'the person has already been added to the phonebook' 
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random()*100000),
  }
  persons = persons.concat(person)
  response.json(person)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)