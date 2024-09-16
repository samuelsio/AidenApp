const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    host: "localhost",
    port: 5432,
    database: "testdb",
    user: "app_user",
    password: "app_password",
});

module.exports = pool;
