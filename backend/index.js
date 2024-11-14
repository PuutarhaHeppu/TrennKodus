require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT || 2000
const swaggerUi = require("swagger-ui-express")
const ih = require("integralhelm")
const Sitemapper = require('sitemapper');
const sitemap = new Sitemapper();
const swaggerDocument = require('./docs/swagger.json');
app.use(
    ih({
        helmet: {
            csp: { "style-src": ["'self'"], "font-src": ["'self'"] }
        },
        pp: { autoplay: ["self"] }
    }),
);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(express.json())

const exercises = [
    {id: 1, name: "Push-up", description: "An exercise in wich a person keeping a prone position with the hands palms down under the shoulders the balls of the feet on the ground, and the back straight pushes the body up and lets it down by an alternate straightening and bending of the arms.", MuscleGroup: "Chest"},
    {id: 2, name: "Diamond push-up", description: "An exercise in wich a person keeping a prone position with the hands palms down under the chest in a diamond position the balls of the feet on the ground, and the back straight pushes the body up and lets it down by an alternate straightening and bending of the arms.", MuscleGroup: "Chest and triceps"},
    {id: 3, name: "Squat", description:"To sit in a low crouching position with the legs drawn up closely beneath or in front of the body.", MuscleGroup:"Quads"},
    {id: 4, name: "Pistol squat", description:"Perform pistol squats by lowering your body on one leg with your arms extended in front of you to counterbalance your bodyweight.", MuscleGroup:"Quads and hamstrings"},
    {id: 5, name: "Lat pull down", description:"Pull a long rubberband attached to something strong, towards your chest, and then slowly extend your arms back to starting position.", MuscleGroup:"Lats"}
]

const trainingPrograms = [
    {id: 1, name: "Chest day", description: "It's not only about pushing heavy weight but mastering the art of manageable weight control. It's vital to maintain correct form and ensure each rep counts for the majority of chest trainers. Chest exercises are more effective when executed with precision."},
    {id: 2, name: "Leg day", description: "It's a day when you focus all your attention while you're at home on developing your lower body."},
    {id: 3, name: "Core day", description: "Any exercise that involves the use of your stomach muscles and back muscles in a coordinated way."},
    {id: 4, name: "Back day", description: "Back Days work your lats, traps, rotator cuff, biceps, forearms, and spinal erectors."},
    {id: 5, name: "Arms day", description: "A complete arm workout for men should include a warmup and exercises that target all of the arm muscles, including the triceps, biceps, forearms, and shoulders."}
]

app.get("/exercises", (req, res) => {
    res.send(exercises.map(({id,name,description,MuscleGroup}) => {
        return {id, name, description, MuscleGroup}
    }))
})

app.get("/trainingPrograms", (req, res) => {
    res.send(trainingPrograms.map(({id,name,description}) => {
        return {id, name, description}
    }))
})

function createId() {
    const maxIdExercise = exercises.reduce((prev, current) => (prev.id > current.id) ? prev : current, 1)
    return maxIdExercise.id + 1;
}

function createTrainingProgramId() {
    const maxIdTrainingProgram = trainingPrograms.reduce((prev, current) => (prev.id > current.id) ? prev : current, 1)
    return maxIdTrainingProgram.id + 1;
}

app.post('/exercises', (req, res) => {
    if (!req.body.name || req.body.name.trim().length === 0){
        return res.status(400).send({error: "Missing required field 'name'"})
    }
    const newExercise = {
        id: createId(),
        name: req.body.name,
        description: req.body.description,
        MuscleGroup: req.body.MuscleGroup
    }
    exercises.push(newExercise)
    res.status(201)
        .location(`${getBaseUrl(req)}/exercises/${newExercise.id}`)
        .send(newExercise)
})

app.post('/trainingPrograms', (req, res) => {
    if (!req.body.name || req.body.name.trim().length === 0){
        return res.status(400).send({error: "Missing required field 'name'"})
    }
    const newtrainingProgram = {
        id: createTrainingProgramId(),
        name: req.body.name,
        description: req.body.description
    }
    trainingPrograms.push(newtrainingProgram)
    res.status(201)
        .location(`${getBaseUrl(req)}/trainingPrograms/${newtrainingProgram.id}`)
        .send(newtrainingProgram)
})

app.get('/exercises/:id', (req, res) => {
    const exercise = getExercise(req,res)
    if (!exercise) { return }
    return res.send(exercise)
})

app.get('/trainingPrograms/:id', (req, res) => {
    const trainingProgram = getTrainingProgram(req,res)
    if (!trainingProgram) { return }
    return res.send(trainingProgram)
})

app.put("/exercises/:id", (req, res)  => {
    const exercise = getExercise(req,res)
    if (!exercise) { return }
    if (!req.body.name || req.body.name.trim().length === 0){
        return res.status(400).send({error: "Missing required field 'name'"})
    }
    exercise.name = req.body.name
    exercise.description = req.body.description,
    exercise.MuscleGroup = req.body.MuscleGroup
    return res
        .location(`${getBaseUrl(req)}/exercises/${exercise.id}`)
        .send(exercise)
})

app.put("/trainingPrograms/:id", (req, res)  => {
    const trainingProgram = getTrainingProgram(req,res)
    if (!trainingProgram) { return }
    if (!req.body.name || req.body.name.trim().length === 0){
        return res.status(400).send({error: "Missing required field 'name'"})
    }
    trainingProgram.name = req.body.name
    trainingProgram.description = req.body.description
    return res
        .location(`${getBaseUrl(req)}/trainingPrograms/${trainingProgram.id}`)
        .send(trainingProgram)
})

app.delete('/exercises/:id', (req, res) => {
    const exercise = getExercise(req,res)
    if (!exercise) { return }
    exercises.splice(exercises.indexOf(exercise), 1)
    res.status(204).send()
})

app.delete('/trainingPrograms/:id', (req, res) => {
    const trainingProgram = getTrainingProgram(req,res)
    if (!trainingProgram) { return }
    trainingPrograms.splice(trainingPrograms.indexOf(trainingProgram), 1)
    res.status(204).send()
})

function getBaseUrl (req) {
    return (req.connection && req.connection.encrypted ? 'https' : 'http') + `://${req.headers.host}`
}

function getExercise(req, res) {
    const idNumber = parseInt(req.params.id)
    if (isNaN(idNumber)) {
        res.status(400).send({error: `ID must be a whole number: ${req.params.id}`})
        return null
    }
    const exercise = exercises.find(e => e.id === idNumber)
    if (!exercise) {
        res.status(404).send({error: `Exercise not found`})
        return null
    }
    return exercise
}
 
function getTrainingProgram(req, res) {
    const idNumber = parseInt(req.params.id)
    if (isNaN(idNumber)) {
        res.status(400).send({error: `ID must be a whole number: ${req.params.id}`})
        return null
    }
    const trainingProgram = trainingPrograms.find(e => e.id === idNumber)
    if (!trainingProgram) {
        res.status(404).send({error: `Training program not found`})
        return null
    }
    return trainingProgram
}

app.get("/", (req, res) => {
    res.send(`Server running. Docs at <a href="http://localhost:${port}/docs">/docs</a>`)
})

app.listen(port, async () => {
    require("./db")
    console.log(`API up at: http://localhost:${port}`)
})