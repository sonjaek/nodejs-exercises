const express = require("express")
const app = express()

let contactInfo = [
  {
    id: 1,
    name: "Sonja Ek",
    number: "040-6770976",
  },
  {
    id: 1,
    name: "Ronja Ek",
    number: "040-6776976",
  },
  {
    id: 1,
    name: "Sonya Ek",
    number: "040-6779936",
  },
  {
    id: 1,
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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
