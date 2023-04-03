import { db } from "../config/database.js"

function findByEmail(email) {
    return db.query(`SELECT * FROM users 
    WHERE email=$1;`, [email]);
}

function insertUser({ name, email, password }) {
    return db.query(`INSERT INTO users 
    (name, email, password) VALUES ($1,$2,$3);`,
    [name, email, password]);
}


export const usersRepository = {
    findByEmail,
    insertUser
}