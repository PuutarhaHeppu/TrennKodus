const {db} = require("../db");
const Utils = require ("./utils"); 

exports.getAll = async (req, res) => {
    const exercises = await db.exercises.findAll();
    res.send(exercises.map(({id, name})=> { 
        return {id, name}
    }))
}

exports.create = async (req, res) => {
    if (!req.body.name || req.body.name.trim().length === 0) {
        return res.status(400).send({ error: "Missing required field 'name'" })
    }
    const newExercise = {
        name: req.body.name,
        description: req.body.description,
        muscleGroup: req.body.muscleGroup
    }
    const createdExercise = await db.exercises.create(newExercise)
    res.status(201)
        .location(`${Utils.getBaseUrl(req)}/exercises/${createdExercise.id}`)
        .send(createdExercise)
}
exports.deleteById = async (req, res) => {
    const exercise = await getExercise(req, res)
    if (!exercise) { return }
    await exercise.destroy();
    return res.status(204).send()
};

exports.getById = async (req, res) => {
    const exercise = await getExercise(req, res)
    if (!exercise) { return }
    return res.send(exercise)
};
exports.editById = async (req, res) => {
    const exercise = await getExercise(req, res)
    if (!exercise) { return }
    if (!req.body.name || req.body.name.trim().length === 0) {
        return res.status(400).send({ error: "Missing required field 'name'" })
    }
    exercise.name = req.body.name
    exercise.description = req.body.description,
    exercise.muscleGroup = req.body.muscleGroup
    await exercise.save();
    return res
        .location(`${Utils.getBaseUrl(req)}/exercises/${exercise.id}`)
        .send(exercise)
};

const getExercise = async (req, res) => {
    const idNumber = parseInt(req.params.id)
    if (isNaN(idNumber)) {
        res.status(400).send({ error: `ID must be a whole number: ${req.params.id}` })
        return null
    }
    const exercise = await db.exercises.findByPk(idNumber)
    if (!exercise) {
        res.status(404).send({ error: `Exercise not found` })
        return null
    }
    return exercise
}