import moment from 'moment';
import { querryDb } from '../../../db';
import {
    insertMessage,
    findUserByEmail,
    findAll,
    findUnreadMessages,
    findSentMessages,
    findMessageById,
    deleteMessageById,
} from '../../helpers/v2/queries';

// a function to save a message when requested
const saveMessage = (sender, reciever, subject, text, parentMessageId,
    status) => new Promise(async (resolve, reject) => {// eslint-disable-line
    let senderId;
    let recieverId;
    const tempUser = await querryDb.query(findUserByEmail(sender));
    const tempReciever = await querryDb.query(findUserByEmail(reciever));
    if (tempUser.rows[0] !== undefined) {
        // searching for the recieverID
        senderId = tempUser.rows[0].id;
        recieverId = tempReciever.rows[0].id;
        // creating a temp message
        const tempMessage = [senderId, recieverId,
            parentMessageId, subject, text, status,
            moment(new Date())];

        try {
            const { rows } = await querryDb.query(insertMessage, tempMessage);
            console.log(rows[0]);
            resolve(rows[0]);
        } catch (error) {
            resolve(error);
        }
    } else {
        const result = {
            data: 'the sender user is not autheticated',
        };
        resolve(result);
    }
});

const fetchAllMessages = () => new Promise(async (resolve, reject) => {// eslint-disable-line
    try {
        const { rows } = await querryDb.query(findAll('messages'));
        resolve(rows);
    } catch (error) {
        reject(error);
    }
});

// Function to fetch all unread messages

const fetchAllUnreadMessages = () => new Promise(async (resolve, reject) => {// eslint-disable-line
    try {
        const { rows } = await querryDb.query(findUnreadMessages);
        resolve(rows);
    } catch (error) {
        reject(error);
    }
});

const fetchAllSentMessages = () => new Promise(async (resolve, reject) => {// eslint-disable-line
    try {
        const { rows } = await querryDb.query(findSentMessages);
        resolve(rows);
    } catch (error) {
        reject(error);
    }
});

const fetchSpecificMessage = (id) => new Promise( async (resolve, reject) => {// eslint-disable-line
    try {
        const previousMessage = await querryDb.query(findMessageById(id));
        if (!previousMessage.rows[0]) {
            resolve([{
                message: 'Message doesn\'t exist',
            }]);
        }
        const { rows } = await querryDb.query(findMessageById(id));
        console.log(rows);
        resolve(rows);
    } catch (error) {
        reject(error);
    }
});

const deleteSpecificMessage = (id) => new Promise(async (resolve, reject) => {// eslint-disable-line
    try {
        const previousMessage = await querryDb.query(findMessageById(id));
        if (!previousMessage.rows[0]) {
            resolve([{
                message: 'Message doesn\'t exist',
            }]);
        } else {
            const { rows } = await querryDb.query(deleteMessageById(id));
            console.log(rows);
            resolve([{
                message: 'Deleted successfully',
            }]);
        }
    } catch (error) {
        reject(error);
    }
});

export {
    saveMessage,
    fetchAllMessages,
    fetchAllUnreadMessages,
    fetchAllSentMessages,
    fetchSpecificMessage,
    deleteSpecificMessage,
};
