const {db} = require("../db");

exports.getBaseUrl = (req) => {
    return (req.connection && req.connection.encrypted ? 'https' : 'http') + `://${req.headers.host}`
}

exports.getExercise = async (req, res) {
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