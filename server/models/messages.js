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
class InboxSchema {// eslint-disable-line
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
const saveMessage = (sender, reciever, subject, parentMessageId,
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
                        // creating a temp message
                        const tempMessage = new MessageSchema(idM += 1,
                            Date.now(), subject, parentMessageId, status);
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
                        resolve(messagesStorage[messagesStorage.length - 1]);
                    } else reject(err);
                });
        } else reject(err);
    });
});


const fetchAllMessages = () => new Promise((resolve, reject) => {
    if (messagesStorage.length === 0) resolve(false);
    else resolve(messagesStorage);
});

export { saveMessage, fetchAllMessages }// eslint-disable-line