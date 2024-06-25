const bcrypt = require("bcrypt");
const pool = require("../config/db");

exports.getAllUsers = async () => {
    const { rows } = await pool.query(
        "SELECT user_id, email, first_name, last_name, gender, last_logged_in FROM users"
    );
    return rows;
};

exports.createUser = async ({
    email,
    password,
    first_name,
    last_name,
    gender,
}) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows } = await pool.query(
        "INSERT INTO users (email, password, first_name, last_name, gender) VALUES ($1, $2, $3, $4, $5) RETURNING user_id",
        [email, hashedPassword, first_name, last_name, gender]
    );
    return rows[0];
};

exports.updateUser = async (
    id,
    { email, password, first_name, last_name, gender, last_logged_in }
) => {
    const updates = [];
    const values = [id];
    let query = "UPDATE users SET ";

    if (email) {
        updates.push("email = $2");
        values.push(email);
    }
    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updates.push("password = $3");
        values.push(hashedPassword);
    }
    if (first_name) {
        updates.push("first_name = $4");
        values.push(first_name);
    }
    if (last_name) {
        updates.push("last_name = $5");
        values.push(last_name);
    }
    if (gender) {
        updates.push("gender = $6");
        values.push(gender);
    }
    if (last_logged_in) {
        updates.push("last_logged_in = $7");
        values.push(last_logged_in);
    }

    query += updates.join(", ") + ` WHERE user_id = $1`;
    await pool.query(query, values);
};
