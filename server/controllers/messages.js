import { saveMessage } from '../models/messages';


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
            result.status = status;
            result.data = [tempMessage];
            res.status(_status).json(result);
        } catch (error) {
            res.status(500).json(`${error}`);
        }
    },
    fetchAll: async (req, res) => {
        const result = {};
        const _status = 200;// eslint-disable-line

        const {
            token, subject, parentMessageId, status,
        } = req.body;
        try {
            const tempMessage = await saveMessage(token, subject,
                parentMessageId, status);
            result.status = status;
            result.data = [tempMessage];
            res.status(_status).json(result);
        } catch (error) {
            res.status(500).json(`${error}`);
        }
    },
};


export default messagesController;
