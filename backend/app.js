//express & libraries
const express = require('express')
const app = express();
var cors = require('cors');
const initialiseDatabaseRoutes=require("./routes/initialiseDatabase");
const getDataRoutes=require("./routes/getData");


//middlewares
require('dotenv').config()
app.use(cors());
app.use(express.json());
app.use("/api/initialise", initialiseDatabaseRoutes);
app.use("/api/getData", getDataRoutes);
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Home page of COVID-19 Application site!');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})