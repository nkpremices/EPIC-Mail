import { saveMessage, fetchAllMessages } from '../models/messages';


const messagesController = {
    send: async (req, res) => {
        const result = {};
        const _status = 200;// eslint-disable-line

        const {
            sender, reciever, subject, parentMessageId, status,
        } = req.body;
        try {
            const tempMessage = await saveMessage(sender, reciever, subject,
                parentMessageId, status);
            result.status = _status;
            result.data = [tempMessage];
            res.status(_status).json(result);
        } catch (error) {
            res.status(500).json(`${error}`);
        }
    },
    fetchAll: async (req, res) => {
        const result = {};
        const _status = 200;// eslint-disable-line      
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
