const express = require("express")
const app = express()

app.use(express.json())

let contactInfo = [
  {
    id: 1,
    name: "Sonja Ek",
    number: "040-6770976",
  },
  {
    id: 2,
    name: "Ronja Ek",
    number: "040-6776976",
  },
  {
    id: 3,
    name: "Sonya Ek",
    number: "040-6779936",
  },
  {
    id: 4,
    name: "Sorja Ek",
    number: "040-6779976",
  },
]

app.get("/info", (req, res) => {
	res.send(`<p>Phonebook has info for ${contactInfo.length} people</p><p>${new Date()}</p>`)
})

app.get("/api/persons", (req, res) => {
  res.json(contactInfo)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = contactInfo.find(note => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = contactInfo.filter(note => note.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }

  const person = {
    name: body.name,
    number: body.number || "unknown",
    id: Math.floor(Math.random() * 100000),
  }

  contactInfo = contactInfo.concat(person)

  response.json(contactInfo)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
