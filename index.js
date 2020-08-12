//init express
const express = require("express");

//init body-parser
const bodyParser = require("body-parser");

//gunakan express
const app = express();

//port
const port = 5001;

app.use(bodyParser.json())

//import router
const routerv1 = require("./routes/routev1");

app.use("/api/v1", routerv1);

app.listen(port, () => console.log(`Listening on port ${port}`));