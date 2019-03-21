/**
 * Database tables
 */

const usersTable = `CREATE TABLE IF NOT EXISTS
users(
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(128) NULL,
  lastName VARCHAR(128) NULL,
  userName VARCHAR(128) NOT NULL,
  email VARCHAR(128) UNIQUE NOT NULL,
  password VARCHAR(128) NOT NULL,
  isAdmin BOOLEAN DEFAULT FALSE,
  isLogedIn BOOLEAN DEFAULT FALSE
);`;

const messagesTable = `CREATE TABLE IF NOT EXISTS
messages(
  id SERIAL PRIMARY KEY,
  senderId INTEGER REFERENCES users(id) NOT NULL,
  receiverId INTEGER REFERENCES users(id) NULL,
  parentMessageId INTEGER DEFAULT 0,
  subject VARCHAR(128) NOT NULL,
  text TEXT NOT NULL,
  status VARCHAR(10) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  groupId INTEGER REFERENCES groups(id) NULL,
  isread BOOLEAN DEFAULT FALSE
);`;

const groupsTable = `CREATE TABLE IF NOT EXISTS
groups(
  id SERIAL PRIMARY KEY,
  name VARCHAR(128) NOT NULL
);
CREATE TABLE IF NOT EXISTS
group_members(
  id SERIAL PRIMARY KEY,
  groupId INTEGER REFERENCES groups(id),
  memberId INTEGER REFERENCES users(id),
  role VARCHAR(50) NOT NULL
);`;


export {
    usersTable,
    messagesTable,
    groupsTable,
};
