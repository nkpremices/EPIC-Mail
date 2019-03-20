const findAll = table => `SELECT * FROM ${table}`;
const findOne = (table, column,
    value) => `SELECT * FROM ${table} WHERE ${column} = ${value}`;
const insertUser = `INSERT INTO users (firstName, lastName,
userName, email, password, isAdmin)
VALUES($1, $2, $3, $4, $5, $6) returning *`;
export {
    findAll,
    findOne,
    insertUser,
};
