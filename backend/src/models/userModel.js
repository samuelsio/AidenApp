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

exports.updateUser = async (id, updatedFields) => {
    const updates = [];
    const values = [];
    let queryIndex = 1;

    const allowedFields = [
        "email",
        "password",
        "first_name",
        "last_name",
        "gender",
        "last_logged_in",
    ];

    for (const [key, value] of Object.entries(updatedFields)) {
        if (allowedFields.includes(key) && value !== undefined) {
            if (key === "password") {
                const hashedPassword = await bcrypt.hash(value, 10);
                updates.push(`${key} = $${queryIndex++}`);
                values.push(hashedPassword);
            } else {
                updates.push(`${key} = $${queryIndex++}`);
                values.push(value);
            }
        }
    }

    if (updates.length === 0) {
        throw new Error("No valid fields provided for update");
    }

    values.push(id);
    const query = `UPDATE users SET ${updates.join(
        ", "
    )} WHERE user_id = $${queryIndex} RETURNING *`;

    const { rows } = await pool.query(query, values);
    return rows.length;
};
