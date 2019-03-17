import jwt from 'jsonwebtoken';
import { usersStorage } from './users';

// A schema for messages
class MessageSchema {
    constructor(id,
        createdOn, subject, text,
        parentMessageId, status) {
        this.id = id;
        this.createdOn = createdOn;
        this.subject = subject;
        this.text = text;
        this.parentMessageId = parentMessageId;
        this.status = status;
    }
}

// a schema for sent messages
class SentSchema {// eslint-disable-line
    constructor(senderId, messageId, createdOn) {
        this.senderId = senderId;
        this.messageId = messageId;
        this.createdOn = createdOn;
    }
}

// a schema for inbox messages
class InboxSchema {// eslint-disable-line
    constructor(recieverId, messageId, createdOn) {
        this.recieverId = recieverId;
        this.messageId = messageId;
        this.createdOn = createdOn;
    }
}


// a data structure for storing all the messages

const messagesStorage = [];
let idM = 0;

// a data structure for storing all the messages
const sentStorage = [];// eslint-disable-line

// a data structure for storing all the messages
const inboxStorage = [];// eslint-disable-line


// a function to save a message when requested
const saveMessage = (sender, reciever, subject, text, parentMessageId,
    status) => new Promise((resolve, reject) => {
    let senderId;// eslint-disable-line
    let recieverId;// eslint-disable-line
    const secretKey = process.env.JWT_KEY;
    jwt.verify(sender, secretKey, (err, decodedSender) => {
        if (!err) {
            senderId = decodedSender.id;
            jwt.verify(reciever, secretKey,
                (error, decodedReciever) => {
                    recieverId = decodedReciever.id;
                    if (!err) {
                        if (usersStorage.find(user => user
                            .id === decodedSender.id) && usersStorage
                            .find(user => user
                                .id === decodedReciever.id)) {
                            // creating a temp message
                            const tempMessage = new MessageSchema(idM += 1,
                                Date.now(), subject, text,
                                parentMessageId, status);
                            messagesStorage.push(tempMessage);
                            console.log(messagesStorage);

                            // creating a temp sent message
                            const tempSent = new SentSchema(senderId,
                                tempMessage.id, Date.now());
                            sentStorage.push(tempSent);
                            console.log(sentStorage);

                            // creating a temp sent message
                            const tempInbox = new InboxSchema(recieverId,
                                tempMessage.id, Date.now());
                            inboxStorage.push(tempInbox);
                            console.log(inboxStorage);
                            resolve(messagesStorage[messagesStorage
                                .length - 1]);
                        } else {
                            const result = {
                                data: 'All users are not autheticated',
                            };
                            resolve(result);
                        }
                    } else reject(err);
                });
        } else reject(err);
    });
});


const fetchAllMessages = () => new Promise((resolve, reject) => {// eslint-disable-line
    if (messagesStorage.length !== 0) {
        const response = messagesStorage.map((message) => {
            const {
                id,
                createdOn,
                subject,
                text,
                parentMessageId,
                status,
            } = message;
            const { senderId } = sentStorage
                .filter(reference => reference.messageId === id)[0];
            const { recieverId } = inboxStorage
                .filter(reference => reference.messageId === id)[0];
            return {
                id,
                createdOn,
                subject,
                text,
                senderId,
                recieverId,
                parentMessageId,
                status,
            };
        });
        resolve(response);
    } else resolve(false);
});

export { saveMessage, fetchAllMessages }// eslint-disable-line