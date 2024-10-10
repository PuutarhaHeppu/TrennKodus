const port = 8080
const app = require("express")()
const swaggerUi = require("swagger-ui-express")
const swaggerDoc = require("./docs/swagger.json")

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc))

app.get("/harjutused", (req, res) => {
    res.send(["rinnalt surumine", "kükid"])
})

app.post("/harjutused", (req, res) => {
    if (!req.body.name || req.body.name.trim().length === 0){
        return res.status(400).send({error: "Missing required field 'name'"})
    }
    const newKordused = parseFloat(req.body.korudsed);
    const newHarjutus = {
        id: createId(),
        name: req.body.name,
        kordused: isNaN(newKordused) ? null : newKordused
        }
    harjutused.push(newHarjutus)
    res.send(harjutused)
})
 
app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`)
})