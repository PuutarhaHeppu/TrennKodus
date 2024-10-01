const port = 8080
const app = require("express")()
const swaggerUi = require("swagger-ui-express")
const swaggerDoc = require("./docs/swagger.json")

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc))

app.get("/harjutused", (req, res) => {
    res.send(["rinnalt surumine", "kükid"])
})

app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`)
})