const {db} = require("../db");
const Utils = require ("./utils"); 

exports.getAll = async (req, res) => {
    const exercises = await db.exercises.findAll();
    res.send(exercises.map(({id, name, description, muscleGroup})=> { 
        return {id, name, description, muscleGroup}
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
    const Exercise = await getExercise(req, res)
    if (!Exercise) { return }
    await Exercise.destroy();
    return res.status(204).send()
};

exports.getById = async (req, res) => {
    const Exercise = await getExercise(req, res)
    if (!Exercise) { return }
    return res.send(Exercise)
};
exports.editById = async (req, res) => {
    const Exercise = await getExercise(req, res)
    if (!Exercise) { return }
    if (!req.body.name || req.body.name.trim().length === 0) {
        return res.status(400).send({ error: "Missing required field 'name'" })
    }
    Exercise.name = req.body.name
    Exercise.description = req.body.description,
    Exercise.muscleGroup = req.body.muscleGroup
    await Exercise.save();
    return res
        .location(`${Utils.getBaseUrl(req)}/exercises/${Exercise.id}`)
        .send(Exercise)
};

const getExercise = async (req, res) => {
    const idNumber = parseInt(req.params.id)
    if (isNaN(idNumber)) {
        res.status(400).send({ error: `ID must be a whole number: ${req.params.id}` })
        return null
    }
    const Exercise = await db.exercises.findByPk(idNumber)
    if (!Exercise) {
        res.status(404).send({ error: `Exercise not found` })
        return null
    }
    return Exercise
}