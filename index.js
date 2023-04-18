const express = require("express")
const app = express()

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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
