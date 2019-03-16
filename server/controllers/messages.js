import { saveMessage, fetchAllMessages } from '../models/messages';


const messagesController = {
    // function to send a message to a specific user
    send: async (req, res) => {
        const result = {};
        const _status = 200;// eslint-disable-line

        const {
            sender, reciever, subject, text, parentMessageId, status,
        } = req.body;
        try {
            const tempMessage = await saveMessage(sender, reciever, subject,
                text, parentMessageId, status);
            result.status = _status;
            result.data = [tempMessage];
            res.status(_status).json(result);
        } catch (error) {
            res.status(500).json(`${error}`);
        }
    },
    // Function to get all recieved messages of a specific user
    fetchAll: async (req, res) => {
        const result = {};
        const _status = 200;// eslint-disable-line
        const { user } = req.body;
        const tempMessages = await fetchAllMessages();
        if (tempMessages) {
            result.status = _status;
            result.data = tempMessages;
            res.status(_status).json(result);
        } else {
            result.data = {
                message: 'empty array',
            };
            res.status(404).json(result);
        }
    },
};


export default messagesController;
