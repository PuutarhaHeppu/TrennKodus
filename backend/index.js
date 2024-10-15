const port = 8080
const app = require("express")()
const swaggerUi = require("swagger-ui-express")
const swaggerDoc = require("./docs/swagger.json")

const harjutused = [
    {id: 1, name: "push-up", repetition: 10},
    {id: 2, name: "Diamond push-up", repetition: 10},
    {id: 3, name: "squat", kordused: 10},
    {id: 4, name: "pistol squat", kordused: 10},
    {id: 5, name: "lat pull down", kordused: 10}
]

app.get("/harjutused", (req, res) => {
    if (typeof harjutused[req.params.id - 1] === 'undefined'){
        return res.status(404).send({error: "Exercise not found"})
    }
})

app.get('/harjutused/:id', (req, res) => {
    res.send(harjutused[req.params.id - 1])
})

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc))


app.post("/harjutused", (req, res) => {
    if (!req.body.name || req.body.name.trim().length === 0){
        return res.status(400).send({error: "Missing required field 'name'"})
    }
    const newKordused = parseFloat(req.body.korudsed);
    const newHarjutus = {
        id: createId(),
        name: req.body.name,
        set: isNaN(newSet) ? null : newSet,
        repetition: isNaN(newRepetition) ? null : newRepetition
        }
    harjutused.push(newHarjutus)
    res.send(harjutused)
})
 
app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`)
})