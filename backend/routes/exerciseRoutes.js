const ExerciseController = require("../controllers/GamesController")
module.exports = (app)=>{
    app.route("/exercises")
        .get(ExercisesController.getAll)
        .post(ExercisesController.create);
    app.route("/exercises/:id")
        .get(ExercisesController.getById)
        .put(ExercisesController.editById)
        .delete(ExercisesController.deleteById);
}