const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");
// test line 6
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());

app.get('*', (req, res) => { //Its essentially a catchall. 
  res.sendFile(path.join(__dirname, '../client/public/index.html'))
})


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
