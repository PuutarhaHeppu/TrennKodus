const TrainingProgramsController = require("../controllers/TrainingProgramsController");
module.exports = (app)=> {
    app.route("/trainingPrograms")
        .get(TrainingProgramsController.getAll)
        .post(TrainingProgramsController.create);
    app.route("/trainingPrograms/:id")
        .get(TrainingProgramsController.getById)
        .put(TrainingProgramsController.editById)
        .delete(TrainingProgramsController.deleteById);
}