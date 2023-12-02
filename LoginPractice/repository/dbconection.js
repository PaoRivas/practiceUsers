const sql = require("mssql");
require("dotenv").config();

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: "localhost",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

const connectToDB = async () => {
  try {
    // make sure that any items are correctly URL encoded in the connection string
    await sql.connect(sqlConfig);
    console.log("connected to the database");
  } catch (err) {
    // ... error checks
    console.log("error connecting to the database");
  }
};

module.exports = { connectToDB };
