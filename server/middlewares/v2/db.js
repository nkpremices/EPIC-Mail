
import { querryDb } from '../../helpers/v2/db';
import {
    usersTable,
    messagesTable,
    groupsTable,
} from '../../../db';


const something = 'stuff';

const initializeDb = async () => {
    await querryDb.query(usersTable);
    await querryDb.query(groupsTable);
    await querryDb.query(messagesTable);
};

export {
    something,
    initializeDb,
};
