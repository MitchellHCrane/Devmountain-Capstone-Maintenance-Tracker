//set up for the configuration of PostgreSQL connection.
const { Pool } = require("pg");
//dotenv is to hide password
require("dotenv").config();

const { connectionUri } = process.env;
const pool = new Pool({
  connectionUri,
});

pool.query("SELECT NOW()", (err, res) => {
  console.log(err, res);
  // pool.end();
});

// CREATE New user
const createUser = (req, res) => {
  const { users_name, users_password } = req.body;

  pool.query(
    "INSERT INTO users(users_name, users_password) VALUES($1, $2)",
    [users_name, users_password],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`User ${results} added`);
    }
  );
};

//CREATE New Garage item
const createGarage = (req, res) => {
  const { garage_image, vehicle_name } = req.body;

  pool.query(
    "INSERT INTO garage (garage_image, vehicle_name) VALUES ($1, $2)",
    [garage_image, vehicle_name],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`${vehicle_name} & ${results} added to your garage`);
    }
  );
};

//CREATE New maintenance record
const createRecord = (req, res) => {
  const { record_date, mileage, service_note } = req.body;

  pool.query(
    "INSERT INTO record (record_date, mileage, service_note) VALUES ($1, $2, $3)",
    [record_date, mileage, service_note],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`${results} record added to ${garage_id}`);
    }
  );
};

//DELETE garage item
const deleteGarage = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("DELETE FROM garage WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`${results} deleted from your garage`);
  });
};

//DELETE garage item
const deleteRecord = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("DELETE FROM record WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`${results} record deleted`);
  });
};

//from index.js post and delete requests
module.exports = {
  createUser,
  createGarage,
  createRecord,
  deleteGarage,
  deleteRecord,
};
