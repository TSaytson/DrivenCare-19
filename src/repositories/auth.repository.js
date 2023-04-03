import { db } from "../config/database.js";

function createSession(userId, token) {
    return db.query(`INSERT INTO sessions 
    (user_id, token) VALUES ($1, $2);`,
        [userId, token]);
};

function findSessionByToken(token) {
    return db.query(`SELECT * FROM sessions
    WHERE token=$1;`, [token]);
}

function findSessionByUserId(userId) {
    return db.query(`SELECT * FROM sessions
    WHERE user_id=$1;`, [userId]);
}

export const authRepository = {
    createSession,
    findSessionByToken,
    findSessionByUserId
}