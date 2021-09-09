const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());

// simple route. Node and Express server as an API, so that it can give our React app data
app.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

//API's
app.post("/users", db.createUser);
app.post("/garage", db.createGarage);
app.post("/record", db.createRecord);
app.delete("/garage/:id", db.deleteGarage);
app.delete("/record/:id", db.deleteRecord);

// set port, listen for requests
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
