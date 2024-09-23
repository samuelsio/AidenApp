const bcrypt = require("bcrypt");
const pool = require("../config/db");

exports.getAllUsers = async () => {
    const { rows } = await pool.query(
        "SELECT user_id, email, first_name, last_name, gender, last_logged_in FROM users"
    );
    return rows;
};

exports.getUserDetails = async (userId) => { 
    try {
        const { rows } = await pool.query(
            "SELECT user_id, email, first_name, last_name, gender, last_logged_in, username, displayname, date_of_birth, profilepic, profilebackgroundpic, followers, following, description FROM users WHERE user_id = $1",
            [userId]
        );
        return rows;
    } catch (err) {
        console.error(`Error in getUserDetails: ${err.message}`);
        throw err;
    }
};

exports.createUser = async ({
    username,
    email,
    first_name,
    last_name,
    password,
    date_of_birth,
    gender,
}) => {
    try {
        // Input validation
        if (!username || !email || !first_name || !last_name || !password || !date_of_birth) {
            throw new Error('Missing required fields');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into the database
        const { rows } = await pool.query(
            `INSERT INTO users (username, email, password, first_name, last_name, date_of_birth, gender) 
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING user_id`,
            [username, email, hashedPassword, first_name, last_name, date_of_birth, gender]
        );

        return rows[0];
    } catch (err) {
        console.error(err);
        throw new Error('Server error', err);
    }
};


exports.updateUser = async ({userId, updatedFields}) => {
    const updates = [];
    const values = [];
    let queryIndex = 1;
    console.log(`userId: ${userId}`);

    const allowedFields = [
        "email",
        "password",
        "first_name",
        "last_name",
        "gender",
        "last_logged_in",
        "username",
        "displayname",
        "profilepic",
        "profilebackgroundpic",
        "description",
        "date_of_birth",
        "followers",
        "following"
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

    values.push(userId);
    const query = `UPDATE users SET ${updates.join(
        ", "
    )} WHERE user_id = $${queryIndex} RETURNING *`;

    const { rows } = await pool.query(query, values);
    return rows.length;
};

exports.deleteUser = async ({userId}) => {
    try {
        if (!userId){
            throw new Error(`Cant find user with id: ${userId}`)
        }
        const { rows } = await pool.query(
            `DELETE FROM users WHERE user_id = $1 RETURNING user_id, first_name, username, displayname`,
            [userId]
        );
        return rows;
    } catch (err) {
        console.error(err);
        throw new Error('Server error', err);
    }
}
