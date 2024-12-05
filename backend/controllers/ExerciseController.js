const {db} = require("../db");
const Utils = require ("./utils"); 

const exercises = db.exercises;
exports.getAll = async (req, res) => {
    const exercises = await db.exercises.findAll();
    res.send(exercises.map(({id, name})=> { return {id, name}}))
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
export const deleteById = () => {

};
export const getById = async (req, res) => {
    const exercise = await Utils.getExercise(req, res)
    if (!exercise) { return }
    return res.send(exercise)
};
export const editById = () => {

};
