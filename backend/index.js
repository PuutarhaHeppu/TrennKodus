require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 8081;
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require('./docs/swagger.json');
const { db, sync } = require("./db");

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(express.json())
app.use(cors());

app.get("/", (req, res) => {
    res.send(`Server running. Docs at <a href="http://localhost:${port}/docs">/docs</a>`)
})

require("./routes/exerciseRoutes")(app)
require("./routes/trainingProgramRoutes")(app)

app.listen(port, async () => {
    if (process.env.SYNC === "true") { await sync(); }
    console.log(`API up at: http://localhost:${port}`)
})