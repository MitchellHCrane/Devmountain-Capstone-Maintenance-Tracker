//set up for the configuration of PostgreSQL connection.
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect();




// CREATE New user Done
const createUser = (req, res) => {
  const { users_name, users_password } = req.body;
  pool.query(
    "INSERT INTO users(users_name, users_password) VALUES($1, $2)",
    [users_name, users_password],
    (error) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`User ${users_name} added`);
    }
  );
};



//CREATE New Garage item
const createGarage = (req, res) => {
  const { garage_image, vehicle_name } = req.body;
  const users_id = req.params.users_id;

  pool.query(
    "INSERT INTO garage (users_id, garage_image, vehicle_name) VALUES ($1, $2, $3)",
    [users_id, garage_image, vehicle_name],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`${results} added to your garage`);
    }
  );
};



//CREATE New maintenance record
const createRecord = (req, res) => {
  const { record_date, mileage, service_note } = req.body;
  const garage_id = req.params.garage_id;
  const mileageInt = parseInt(mileage);

  pool.query(
    "INSERT INTO record (garage_id, record_date, mileage, service_note) VALUES ($1, $2, $3, $4)",
    [garage_id, record_date, mileageInt, service_note],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`${results} record added to your garage`);
    }
  );
};



//DELETE garage item
const deleteGarage = (req, res) => {
  const garage_id = parseInt(req.params.garage_id);

  pool.query(
    "DELETE FROM garage WHERE id = $1",
    [garage_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`${results} deleted from your garage`);
    }
  );
};



//DELETE garage item
const deleteRecord = (req, res) => {
  const record_id = parseInt(req.params.record_id);

  pool.query(
    "DELETE FROM record WHERE id = $1",
    [record_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`${results} record deleted`);
    }
  );
};



//Get User
const getUser = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.json(results.rows);
  });
};

//Get Garages

const getGarages = (req, res) => {
  const id = parseInt(req.params.users_id);

  pool.query(
    "SELECT * FROM garage WHERE users_id = $1 ORDER BY vehicle_name",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.json(results.rows);
    }
  );
};



// Get Garage
const getGarage = (req, res) => {
  const id = parseInt(req.params.garage_id);

  pool.query("SELECT * FROM garage WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.json(results.rows[0]);
  });
};



// Get Record
const getRecord = (req, res) => {
  const id = parseInt(req.params.garage_id);

  pool.query(
    "SELECT * FROM record WHERE garage_id = $1 ORDER BY mileage DESC",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.json(results.rows);
    }
  );
};



// Login user
const loginUser = (req, res) => {
  const { users_name, users_password } = req.body;
  pool.query(
    "SELECT * FROM users WHERE users_name = $1 AND users_password = $2",
    [users_name, users_password],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).json(results.rows[0]);
    }
  );
};



//to index.js
module.exports = {
  loginUser,
  getUser,
  getGarages,
  getGarage,
  getRecord,
  createUser,
  createGarage,
  createRecord,
  deleteGarage,
  deleteRecord,
};
