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

//API's
app.get("/users/:id", db.getUser);
app.get("/garages/:users_id", db.getGarages);
app.get("/garage/:garage_id", db.getGarage);
app.get("/records/:garage_id", db.getRecord);
app.post("/auth/login", db.loginUser);
app.post("/users", db.createUser);
app.post("/garages/:users_id", db.createGarage);
app.post("/garage/:garage_id", db.createRecord);
app.delete("/garage/:garage_id", db.deleteGarage);
app.delete("/records/:record_id", db.deleteRecord);

// set port, listen for requests
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port #${PORT}.`);
});
