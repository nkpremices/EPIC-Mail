import jwt from 'jsonwebtoken';


// A schema for messages
class MessageSchema {
    constructor(id,
        createdOn, subject,
        parentMessageId, status) {
        this.id = id;
        this.createdOn = createdOn;
        this.subject = subject;
        this.parentMessageId = parentMessageId;
        this.status = status;
        this.unread = true;
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
class InboxtSchema {// eslint-disable-line
    constructor(reciever, messageId, createdOn) {
        this.reciever = reciever;
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
const saveMessage = (token, subject, parentMessageId,
    status) => new Promise((resolve, reject) => {
    let senderId;// eslint-disable-line
    const secretKey = process.env.JWT_KEY;
    jwt.verify(token, secretKey, (err, decoded) => {
        if (!err) {
            senderId = decoded.id;
            // creating a temp message
            // eslint-disable-next-line no-unused-expressions
            const tempMessage = new MessageSchema(idM += 1, Date.now(),
                subject, parentMessageId, status);
            messagesStorage.push(tempMessage);
            console.log(messagesStorage);
            const tempSent = new SentSchema(senderId, tempMessage.id,
                Date.now());
            sentStorage.push(tempSent);
            console.log(sentStorage);
            resolve(messagesStorage[messagesStorage.length - 1]);
        } else reject(err);
    });
});

export { saveMessage }// eslint-disable-line