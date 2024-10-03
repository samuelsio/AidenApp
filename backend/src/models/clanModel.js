const pool = require("../config/db");

exports.getAllClans = async () => {
    const { rows } = await pool.query(
        "SELECT clan_id, clan_name, description, creation_date, leader_id, members_count, clan_background, clan_image FROM clans"
        
    );
    return rows;
};

exports.getClanByName = async (clan_name) => {
   try { 
        const { rows } = await pool.query(
            "SELECT clan_id, clan_name, description, creation_date, leader_id, members_count, clan_background, clan_image FROM clans WHERE clan_name = $1",
            [clan_name]
        );
        return rows;
    } catch (err){
        console.error(`Error in getClanByName: ${err.message}`);
        throw err;
    }
};

exports.getAllEvents = async () => {
    try {
        const { rows } = await pool.query(
            `SELECT event_id, title, description, event_date, creator_id, clan_id FROM events`
        );
        return rows;
    } catch (err){
        console.error(`Error finding events`);
        throw err
    }
};

exports.getEventDetails = async ({eventId}) => {
    try {
        const { rows } = await pool.query(
            `SELECT event_id, title, description, event_date, creator_id, clan_id FROM events WHERE event_id = $1`,
            [eventId]
        );
        return rows;
    } catch (err){
        console.error(`Error finding event`);
        throw err
    }
};

exports.deleteEvent = async ({clan_id, event_id}) => {
    try {
        const { rows } = await pool.query(
            `DELETE FROM events WHERE clan_id = $1 AND event_id = $2 RETURNING *`,
            [clan_id, event_id]
        );
        return rows;
    } catch (err){
        console.error(`Error deleting event`);
        throw err
    }
}

exports.getEventsComments = async (clan_id, event_id) => {
    try { 
        const { rows } = await pool.query(
            `SELECT event_id, title, description, event_date, creator_id, clan_id FROM events WHERE clan_id = $1 AND event_id = $2`,
            [clan_id, event_id]
        );
        return rows;
    } catch (err){
        console.error(`Error finding Event: ${err.message}`);
        throw err;
    }
}

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

exports.deleteBulletin = async(
    clan_id,
    post_id
) => {
    try {
        if (!clan_id || !post_id){
            throw new Error(`Whoops, missing fields: ${clan_id}, ${post_id}`)
        }
        console.log(clan_id, post_id)
        const { rows } = await pool.query(
            `DELETE FROM bulletinboard WHERE clan_id = $1 AND post_id = $2 RETURNING author_id, post_id, clan_id`,
            [clan_id, post_id]
        );
        return rows;
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

exports.getBulletinBoardPost = async (
    clan_id,
    post_id
) => {
    const { rows } = await pool.query(
        `SELECT * FROM bulletinboard WHERE clan_id = $1 AND post_id = $2`,
        [clan_id, post_id]
    );
    if (rows.length <= 0){
        throw new Error(`Row is empty or does not exist`)
    }
    return  rows;
}

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

exports.updateEvent = async ({
    clan_id,
    event_id,
    updatedFields
}) => {
    const updates = [];
    const values = [];
    let queryIndex = 1;
    console.log(`event_id: ${event_id}`);

    const allowedFields = [
        "title",
        "description",
        "event_date",
        "creator_id",
        "clan_id",
        "event_id"
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
    values.push(event_id, clan_id);
    const query = `
        UPDATE events 
        SET ${updates.join(", ")} 
        WHERE event_id = $${queryIndex++} AND clan_id = $${queryIndex}
        RETURNING *`;

    const { rows } = await pool.query(query, values);
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
};

exports.updateClan = async({
    clanId,
    updatedFields
}) => {
    const updates = [];
    const values = [];
    let queryIndex = 1;
    console.log(`clanId: ${clanId}`);

    const allowedFields = [
        "clan_name",
        "description",
        "creation_date",
        "leader_id",
        "members_count",
        "clan_background",
        "clan_image",
        "clan_tag",
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

    values.push(clanId);
    const query = `UPDATE clans SET ${updates.join(
        ", "
    )} WHERE clan_id = $${queryIndex} RETURNING *`;

    const { rows } = await pool.query(query, values);
    return rows.length;
};


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