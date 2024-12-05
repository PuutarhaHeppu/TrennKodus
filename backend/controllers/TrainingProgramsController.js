const {db} = require("../db");
const Utils = require("./utils");

exports.getAll = async (req, res) => {
    const trainingPrograms = await db.trainingProgram.findAll();
    res.send(trainingPrograms.map(({id, name, description}) => {
        return {id, name, description}
    }))
}

exports.create = async (req, res) => {
    if (!req.body.name || req.body.name.trim().length === 0) {
        return res.status(400).send({error: "Missing required field 'name'"})
    }
    const newTrainingProgram = {
        name: req.body.name,
        description: req.body.description
    }
    const createdTrainingProgram = await db.trainingProgram.create(newTrainingProgram);
    res.status(201)
        .location(`${Utils.getBaseUrl(req)}/trainingPrograms/${createdTrainingProgram.id}`)
        .send(createdTrainingProgram)
}

exports.deleteById = async (req, res) => {
    const trainingProgram = await getTrainingProgram(req, res)
    if (!trainingProgram) { return }
    await trainingProgram.destroy();
    return res.status(204).send()
};

exports.getById = async (req, res) => {
    const trainingProgram = await getTrainingProgram(req, res)
    if (!trainingProgram) { return }
    return res.send(trainingProgram)
};

exports.editById = async (req, res) => {
    const trainingProgram = await getTrainingProgram(req, res)
    if (!trainingProgram) { return }
    if (!req.body.name || req.body.name.trim().length === 0) {
        return res.status(400).send({error: "Missing required field 'name'"})
    }
    trainingProgram.name = req.body.name
    await trainingProgram.save();
    return res
        .location(`${Utils.getBaseUrl(req)}/trainingPrograms/${trainingProgram.id}`)
        .send(trainingProgram)
};

const getTrainingProgram = async (req, res) => {
    const idNumber = parseInt(req.params.id)
    if (isNaN(idNumber)) {
        res.status(400).send({error: `ID must be a whole number: ${req.params.id}`})
        return null
    }
    const trainingProgram = await db.trainingPrograms.findByPk(idNumber)
    if (!trainingProgram) {
        res.status(404).send({error: `Training program Not Found!`})
        return null
    }
    return trainingProgram
}