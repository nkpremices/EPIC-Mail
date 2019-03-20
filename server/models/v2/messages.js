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
    status) => new Promise((resolve, reject) => {// eslint-disable-line
    let senderId;
    let recieverId;
    if (usersStorage.find(user => user
        .email === sender)) {
        // searching for the recieverID
        const senderUser = usersStorage.find(user => user
            .email === sender);
        senderId = senderUser.id;
        const recieverUser = usersStorage.find(user => user
            .email === reciever);
        recieverId = recieverUser.id;
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
            data: 'the sender user is not autheticated',
        };
        resolve(result);
    }
});

// a function to discribe the display of the messages

const displayMessages = (storage) => {
    if (storage.length !== 0) {
        const response = storage.map((message) => {
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
        return response;
    } return false;
};

const fetchAllMessages = () => new Promise((resolve, reject) => {// eslint-disable-line
    resolve(displayMessages(messagesStorage));
});

// Function to fetch all unread messages

const fetchAllUnreadMessages = () => new Promise((resolve, reject) => {// eslint-disable-line
    const unreadMessages = messagesStorage
        .filter(message => message.status === 'unread');
    resolve(displayMessages(unreadMessages));
});

const fetchAllSentMessages = () => new Promise((resolve, reject) => {// eslint-disable-line
    resolve(displayMessages(messagesStorage));
});

const fetchSpecificMessage = (id) => new Promise((resolve, reject) => {// eslint-disable-line
    const requestedMessage = messagesStorage
        .filter(message => message.id === parseInt(id, 10));
    resolve(displayMessages(requestedMessage));
});

const deleteSpecificMessage = (id) => new Promise((resolve, reject) => {// eslint-disable-line
    const requestedMessage = messagesStorage
        .filter(message => message.id === parseInt(id, 10));
    if (requestedMessage.length !== 0) {
        messagesStorage.splice(messagesStorage.indexOf(requestedMessage[0]), 1);
        resolve([{
            message: 'successful',
        }]);
    } else resolve(false);
});

export {
    saveMessage,
    fetchAllMessages,
    fetchAllUnreadMessages,
    fetchAllSentMessages,
    fetchSpecificMessage,
    deleteSpecificMessage,
};
