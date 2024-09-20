const { Pool } = require("pg");

const pool = new Pool({
    user: "app_user",
    host: "localhost",
    database: "testdb",
    password: "yourpassword",
    port: 5432,
});

module.exports = pool;
