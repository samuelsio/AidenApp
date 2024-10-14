const bcrypt = require("bcrypt");
const pool = require("../config/db");

exports.getAllUsers = async () => {
    const { rows } = await pool.query(
        "SELECT user_id, username, displayname, creation_date, status FROM users"
    );
    return rows;
};


exports.getUserByEmail = async (email) => {
    try { 
        const { rows } = await pool.query(
            `SELECT user_id, password, email, username, displayname, profilepic, role FROM users WHERE email = $1`,
            [email]
        );
        
        return rows;
    } catch (err) {
        console.error(`Error getting user`);
        throw err;
    }
};

exports.getByUsername = async(username) => {
    try {
        const { rows } = await pool.query(
            `SELECT user_id, email, last_logged_in, username, displayname, profilepic, profilebackgroundpic, followers, following, description FROM users WHERE username = $1`,
            [username]
        );
        return rows;
    } catch (err) {
        console.error(`Error Getting User: ${err.message}`);

exports.getAllMemberships = async () => {
    const { rows } = await pool.query(
        `SELECT membership_id, user_id, clan_id, joined_at FROM membership`
    );
    return rows;
};

exports.getMembershipDetail = async ({clan_id, user_id}) => {
    try { 
        if (!user_id && !clan_id){
            throw new Error(`Missing userId and clanId`)
        }

        if (!user_id){
            const { rows } = await pool.query(
                `SELECT membership_id, user_id, clan_id, joined_at FROM membership WHERE clan_id = $1`,
                [clan_id]
            )
            if (rows.length === 0) {
                throw new Error(`Clan not found`)
            }
            return rows;
        }
        if (!clan_id){
            const { rows } = await pool.query(
                `SELECT membership_id, user_id, clan_id, joined_at FROM membership WHERE user_id = $1`,
                [user_id]
            )
            if (rows.length === 0) {
                throw new Error(`User not found`)
            }
            return rows;
        }
    } catch (err){
        console.error(`Error getting membership detail: ${err.message}`);

        throw err;
    }
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


exports.addFriend = async ({ friendId, userId }) => {
    try {
        if (!friendId || !userId) {
            throw new Error(`Missing fields`);
        }

        const { rows } = await pool.query(
            `INSERT INTO friends (user_id, friend_user_id) VALUES ($1, $2)`,
            [userId, friendId] 
        );

        if (rows.length === 0){
            throw new Error(`error finding friend`)
        }
        return rows;
    } catch (err) {
        console.error(`Error in addFriend: ${err.message}`);
        throw err; 
    }
};


exports.getMembershipDetailedView = async ({
    user_id,
    clan_id
}) => {
    try { 
        const { rows } = await pool.query(
            `SELECT membership_id, user_id, clan_id, joined_at FROM membership WHERE user_id = $1 AND clan_id = $2`,
            [user_id, clan_id]
        );
        if (rows.length === 0){
            throw new Error(`No membership with userId: ${user_id} AND clanId: ${clan_id}`)
        }
        return rows;
    } catch (err){
        console.error(`Error getting membership : ${err}`);
        throw err;
    }
}

exports.createMembership = async({
    user_id,
    clan_id,
}) => {
    try {
        if (!user_id || !clan_id){
            throw new Error(`Missing fields: userId:${user_id}, clanId: ${clan_id}`)
        }
        const { rows } = await pool.query(
            `INSERT INTO membership (user_id, clan_id, joined_at) 
             VALUES ($1, $2, NOW()) RETURNING *`,
            [user_id, clan_id]
        );

        return rows;
    } catch (err) {
        console.error(err);
        throw new Error('Server error', err);
    }
}


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
        if (err.code === '23505') {
            // Try to extract the constraint name
            const constraintName = err.detail
            throw new Error(`Unique constraint violated: ${constraintName}`);
        }
        throw new Error('Server error');
    }
};

exports.updateMembership = async({membership_id, updatedFields}) => {
    const updates = [];
    const values = [];
    let queryIndex = 1;
    console.log(`membership_id: ${membership_id}`);

    const allowedFields = [
        "membership_id",
        "user_id",
        "clan_id",
        "joined_at"
    ];
    for (const [key, value] of Object.entries(updatedFields)) {
        if (allowedFields.includes(key) && value !== undefined) {
            updates.push(`${key} = $${queryIndex++}`);
                values.push(value);
        }
    }
    if (updates.length === 0) {
        throw new Error("No valid fields provided for update");
    }

    values.push(membership_id);
    const query = `UPDATE membership SET ${updates.join(
        ", "
    )} WHERE membership_id = $${queryIndex} RETURNING *`;

    const { rows } = await pool.query(query, values);
    return rows;
}


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

exports.deleteMembership = async ({membership_id}) => {
    try {
        if (!membership_id){
            throw new Error(`Cant find membershipId: ${membership_id}`)
        }
        const { rows } = await pool.query(
            `DELETE FROM membership WHERE membership_id = $1 RETURNING membership_id, user_id, clan_id, joined_at`,
            [membership_id]
        );
        return rows;
    } catch (err) {
        console.error(err);
        throw new Error(`Server Error: ${err}`)
    }
}

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
};
