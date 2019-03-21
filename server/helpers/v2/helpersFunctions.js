import { querryDb } from '../../../db';
import {
    findOne,
    findAll,
} from './queries';


const selectMessgaes = async () => {
    const { rows } = await querryDb.query(findAll('messages'));
    return rows;
};

const selectUsers = async () => {
    const { rows } = await querryDb.query(findAll('users'));
    return rows;
};

const selectOneUser = async (table, column, value) => {
    const { rows } = await querryDb.query(findOne(table, column, value));
    return rows[0];
};
export {
    selectMessgaes,
    selectUsers,
    selectOneUser,
};
