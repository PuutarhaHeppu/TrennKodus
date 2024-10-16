const express = require('express')
const app = express()
const port = 8080
const swaggerUi = require("swagger-ui-express")
const yamljs = require('yamljs')
const swaggerDocument = yamljs.load('./docs/swagger.yaml');

app.use(express.json())

const exercises = [
    {id: 1, name: "push-up", repetition: 10, set: 3},
    {id: 2, name: "Diamond push-up", repetition: 10, set: 3},
    {id: 3, name: "squat", repetition: 10, set: 3},
    {id: 4, name: "pistol squat", repetition: 10, set: 3},
    {id: 5, name: "lat pull down", repetition: 10, set: 3}
]

app.get("/exercises/:id", (req, res) => {
    if (typeof exercises[req.params.id - 1] === 'undefined'){
        return res.status(404).send({error: "Exercise not found"})
    }
})

app.get('/exercises/:id', (req, res) => {
    res.send(exercises[req.params.id - 1])
})

app.post('/exercises', (req, res) => {
    if (!req.body.name || !req.body.set || !req.body.repesition){
        return res.status(400).send({error: "Missing required field 'name'"})
    }
    let exercise = {
        id: exercises.length + 1,
        name: req.body.name,
        set: req.body.set,
        repetition: req.body.repetition,
        // set: isNaN(newSet) ? null : newSet,
        // repetition: isNaN(newRepetition) ? null : newRepetition
    }

    exercises.push(exercise)

    res.status(201)
        .location(`${getBaseUrl(req)}/exercises/${exercises.length}`)
        .send(exercise)
})

app.delete('/exercises/id:', (req, res) => {
    if (typeof exercises[req.params.id - 1] === 'undefined') {
        return res.status(404).send({error: "Exercise not found"})
    }

    exercises.splice(req.params.id -1, 1)

    res.status(204).send({error: "No content"})
})

function getBaseUrl(req) {
    return req.connection && req.connection.encrypted
        ? 'https' : 'http' + `://${req.headers.host}`
}

//  app.post("/exercises", (req, res) => {
//      if (!req.body.name || req.body.name.trim().length === 0){
//          return res.status(400).send({error: "Missing required field 'name'"})
//      }
//      const newKordused = parseFloat(req.body.korudsed);
//      const newExercise = {
//          id: createId(),
//          name: req.body.name,
//          set: isNaN(newSet) ? null : newSet,
//          repetition: isNaN(newRepetition) ? null : newRepetition
//          }
//      exercises.push(newExercise)
//      res.send(exercises)
//  })
 
app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`)
})