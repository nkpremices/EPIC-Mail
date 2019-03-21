const findAll = table => `SELECT * FROM ${table}`;

const findUserByName = (name) => `SELECT * FROM users WHERE username = \'${name}\'`;// eslint-disable-line
const findUserByEmail = (email) => `SELECT * FROM users WHERE email = \'${email}\' `;// eslint-disable-line
const findUnreadMessages = `SELECT * FROM messages WHERE isread = false`;// eslint-disable-line
const findSentMessages = `SELECT * FROM messages WHERE status = \'sent\'`;// eslint-disable-line
const findMessageById = (id) => `SELECT * FROM messages WHERE id = ${id}`;// eslint-disable-line
const deleteMessageById = (id) => `DELETE FROM messages WHERE id = ${id}`;// eslint-disable-line
const setUserLogedIn = id => `UPDATE users SET islogedin = true WHERE id = ${id};`;// eslint-disable-line
const insertUser = `INSERT INTO users (firstName, lastName,
userName, email, password, isAdmin)
VALUES($1, $2, $3, $4, $5, $6) returning *`;

const insertMessage = `INSERT INTO messages (senderid, receiverid,
    parentmessageid, subject, text, status, created_at)
    VALUES($1, $2, $3, $4, $5, $6, $7) returning *`;

export {
    findAll,
    findUserByName,
    findUserByEmail,
    insertUser,
    insertMessage,
    findUnreadMessages,
    findSentMessages,
    findMessageById,
    deleteMessageById,
    setUserLogedIn,
};
