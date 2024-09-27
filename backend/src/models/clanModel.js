const pool = require("../config/db");

exports.getAllClans = async () => {
    const { rows } = await pool.query(
        "SELECT clan_id, clan_name, description, creation_date, leader_id, members_count, clan_background, clan_image FROM clans"
        
    );
    return rows;
};

exports.getClanByName = async (clan_id) => {
   try { 
        const { rows } = await pool.query(
            "SELECT clan_id, clan_name, description, creation_date, leader_id, members_count, clan_background, clan_image FROM clans WHERE clan_name = $1",
            [clan_id]
        );
        console.log(`Clan found:`, rows);
        return rows;
    } catch (err){
        console.error(`Error in getClanByName: ${err.message}`);
        throw err;
    }
};

exports.getIndividualComment = async ({
    event_id,
    comment_id
}) => {
    try {
        console.log(event_id, comment_id)
        const { rows } = await pool.query(
            `SELECT comment_id, content, creation_date, author_id, event_id FROM comments WHERE event_id = $1 AND comment_id = $2`,
            [event_id, comment_id]
        );
        if (rows.length === 0){
            throw new Error(`Comment does not exist`)
        }
        return rows;
    } catch (err){
        console.error(`Error getting individual comment: ${err.message}`);
        throw err;
    }
};

exports.patchIndividualComment = async ({
    event_id,
    comment_id,
    updatedFields
}) => {
    const updates = [];
    const values = [];
    let queryIndex = 1;
    console.log(`comment_id: ${comment_id}`);

    const allowedFields = [
        "comment_id",
        "content",
        "creation_date",
        "author_id",
        "event_id",
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

    values.push(comment_id, event_id); 
    const query = `
        UPDATE comments 
        SET ${updates.join(", ")} 
        WHERE comment_id = $${queryIndex++} AND event_id = $${queryIndex}
        RETURNING *`;

    const { rows } = await pool.query(query, values);
    if (rows.length === 0){
        throw new Error("Clan has not been edited or found")
    }
    return rows;
};

exports.createBulletinComment = async ({clan_id, content, author_id}) => {
    try {
        if (!clan_id || !content || !author_id){
            throw new Error(`Error, missing fields`)
        }
        const {rows} = await pool.query(
            "INSERT INTO bulletinboard (clan_id, content, author_id, creation_date) VALUES ($1, $2, $3, NOW()) RETURNING post_id",
            [clan_id, content, author_id]
        );
        return rows[0];
    } catch (err){
        console.error(`Error: ${err.message}`);
        throw err;
    }
}

exports.getBulletinBoard = async (clanId) =>{
    const { rows } = await pool.query(
        "SELECT * FROM bulletinboard WHERE clan_id = $1 ORDER BY creation_date DESC",
        [clanId]
    );
    return rows;
};

exports.getEventsByClan = async (clanId) => {
    const { rows } = await pool.query(
        `SELECT 
            e.event_id, e.title, e.event_date, e.description, e.creator_id,
            c.comment_id, c.content, c.author_id, c.creation_date
        FROM events e
        LEFT JOIN comments c ON e.event_id = c.event_id
        WHERE e.clan_id = $1
        ORDER BY e.event_id, c.creation_date ASC`,
        [clanId]
    );
    return rows;
};

exports.createEvent = async ({
    title,
    description,
    creator_id,
    clan_id
}) => {
    if (!title || !description || !creator_id || !clan_id){
        throw new Error(`Error, missing fields: title:${title}, description:${description}, creator_id:${creator_id}, clan_id:${clan_id}`)
    }
    const { rows } = await pool.query(
        `INSERT INTO events (title, description, creator_id, clan_id, event_date)
            VALUES ($1, $2, $3, $4, NOW()) RETURNING event_id`,
            [title, description, creator_id, clan_id]
    )
    return rows[0];
};

exports.createEventComment = async ({
    content,
    author_id,
    event_id
}) => {
    if (!content || !author_id){
        throw new Error(`Error, missing fields: content:${content}, author_id:${author_id}`)
    }
    const { rows } = await pool.query(
        `INSERT INTO comments (content, author_id, event_id, creation_date)
         VALUES ($1, $2, $3, NOW()) RETURNING comment_id`,
        [content, author_id, event_id]
    )
    return rows[0];
};

exports.createClan = async ({
    clan_name,
    description,
    leader_id,
    members_count,
    clan_background,
    clan_image
}) => {
    if (!clan_name || !leader_id) {
        throw new Error(`Error, all fields: clan_name: ${clan_name}, description: ${description}, leader_id: ${leader_id}, members_count: ${members_count}, clan_background: ${clan_background}, clan_image: ${clan_image}`);
    }
    const { rows } = await pool.query(
        `INSERT INTO clans (clan_name, description, leader_id, members_count, clan_background, clan_image, creation_date) 
            VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING clan_id`,
        [clan_name, description, leader_id, members_count, clan_background, clan_image]
    )
    return rows[0];
}

exports.deleteIndividualComment = async ({
    event_id,
    comment_id
}) => {
    try {
        if (!event_id || !comment_id){
            throw new Error(`Error, missing fields: event:${event_id}, comment: ${comment_id}`)
        }
        const { rows } = await pool.query(
            `DELETE FROM comments WHERE event_id = $1 AND comment_id = $2 RETURNING comment_id, content, creation_date, author_id, event_id`,
            [event_id, comment_id]
        )
        return rows;

    } catch (err){
        console.error(`Error: ${err.message}`);
        throw err;
    }
}