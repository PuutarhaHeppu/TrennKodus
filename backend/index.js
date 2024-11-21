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

const { db, sync} = require("./db");

app.get("/exercises", async (req, res) => {
    const exercises = await db.Exercise.findAll()
    res.send(db.exercises.findAll().then((allExercises)=>{
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

app.post('/exercises', async (req, res) => {
    if (!req.body.name || req.body.name.trim().length === 0){
        return res.status(400).send({error: "Missing required field 'name'"})
    }
    const newExercise = {
        id: createId(),
        name: req.body.name,
        description: req.body.description,
        MuscleGroup: req.body.MuscleGroup
    }
    const createdExercise = await db.exercises.create(newExercise);
    res.status(201)
        .location(`${getBaseUrl(req)}/exercises/${createdExercise.id}`)
        .send(createdExercise)
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
    const createTrainingProgram = db.trainingPrograms.create(newtrainingProgram)
    res.status(201)
        .location(`${getBaseUrl(req)}/trainingPrograms/${createTrainingProgram.id}`)
        .send(createTrainingProgram)
})

app.get('/exercises/:id', async (req, res) => {
    const exercise = await getExercise(req,res)
    if (!exercise) { return }
    return res.send(exercise)
})

app.get('/trainingPrograms/:id', async (req, res) => {
    const trainingProgram = await getTrainingProgram(req,res)
    if (!trainingProgram) { return }
    return res.send(trainingProgram)
})

app.put("/exercises/:id", async (req, res)  => {
    const exercise = await getExercise(req,res)
    if (!exercise) { return }
    if (!req.body.name || req.body.name.trim().length === 0){
        return res.status(400).send({error: "Missing required field 'name'"})
    }
    exercise.name = req.body.name
    exercise.description = req.body.description,
    exercise.MuscleGroup = req.body.MuscleGroup
    await exercise.save();
    return res
        .location(`${getBaseUrl(req)}/exercises/${exercise.id}`)
        .send(exercise)
})

app.put("/trainingPrograms/:id", async (req, res)  => {
    const trainingProgram = await getTrainingProgram(req,res)
    if (!trainingProgram) { return }
    if (!req.body.name || req.body.name.trim().length === 0){
        return res.status(400).send({error: "Missing required field 'name'"})
    }
    trainingProgram.name = req.body.name
    trainingProgram.description = req.body.description
    await trainingProgram.save();
    return res
        .location(`${getBaseUrl(req)}/trainingPrograms/${trainingProgram.id}`)
        .send(trainingProgram)
})

app.delete('/exercises/:id', async (req, res) => {
    const exercise = await getExercise(req,res)
    if (!exercise) { return }
    await exercise.destroy();
    res.status(204).send()
})

app.delete('/trainingPrograms/:id', async (req, res) => {
    const trainingProgram = await getTrainingProgram(req,res)
    if (!trainingProgram) { return }
    await trainingProgram.destroy();
    res.status(204).send()
})

function getBaseUrl (req) {
    return (req.connection && req.connection.encrypted ? 'https' : 'http') + `://${req.headers.host}`
}

async function getExercise(req, res) {
    const idNumber = parseInt(req.params.id)
    if (isNaN(idNumber)) {
        res.status(400).send({error: `ID must be a whole number: ${req.params.id}`})
        return null
    }
    const exercise = await db.exercises.findByPk(idNumber)
    if (!exercise) {
        res.status(404).send({error: `Exercise not found`})
        return null
    }
    return exercise
}
 
async function getTrainingProgram(req, res) {
    const idNumber = parseInt(req.params.id)
    if (isNaN(idNumber)) {
        res.status(400).send({error: `ID must be a whole number: ${req.params.id}`})
        return null
    }
    const trainingProgram = await db.trainingPrograms.findByPk(idNumber)
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
    if(process.env.SYNC === "true") {
        await sync()
    }
    console.log(`API up at: http://localhost:${port}`)
})