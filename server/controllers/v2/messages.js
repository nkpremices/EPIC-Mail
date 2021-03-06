import
{
    saveMessage,
    fetchAllMessages,
    fetchAllUnreadMessages,
    fetchAllSentMessages,
    fetchSpecificMessage,
    deleteSpecificMessage,
} from '../../models/v2/messages';


const messagesController = {
    // function to send a message to a specific user
    send: async (req, res) => {
        const result = {};
        let _status = 200;// eslint-disable-line

        const {
            sender, reciever, subject, text, parentMessageId, status,
        } = req.body;
        try {
            const tempMessage = await saveMessage(sender, reciever, subject,
                text, parentMessageId, status);
            if (tempMessage.data) _status = 400;
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
        let _status = 200;// eslint-disable-line
        const tempMessages = await fetchAllMessages();
        if (tempMessages) {
            result.status = _status;
            result.data = tempMessages;
            res.status(_status).json(result);
        } else {
            result.data = {
                message: 'empty array',
            };
            res.status(400).json(result);
        }
    },

    // function to fetch all unread messages
    fetchAllUnread: async (req, res) => {
        const result = {};
        let _status = 200;// eslint-disable-line
        const tempMessages = await fetchAllUnreadMessages();
        if (tempMessages) {
            result.status = _status;
            result.data = tempMessages;
            res.status(_status).json(result);
        } else {
            result.data = {
                message: 'empty array',
            };
            res.status(400).json(result);
        }
    },

    // function to fetch all sent messages
    fetchAllSent: async (req, res) => {
        const result = {};
        let _status = 200;// eslint-disable-line
        const tempMessages = await fetchAllSentMessages();
        if (tempMessages) {
            result.status = _status;
            result.data = tempMessages;
            res.status(_status).json(result);
        } else {
            result.data = {
                message: 'empty array',
            };
            res.status(400).json(result);
        }
    },

    // function to fetch a specific message
    fetchSpecific: async (req, res) => {
        const result = {};
        let _status = 200;// eslint-disable-line
        const tempMessages = await fetchSpecificMessage(req.params.id);
        if (tempMessages) {
            result.status = _status;
            result.data = tempMessages;
            res.status(_status).json(result);
        } else {
            result.data = {
                message: 'Message doesn\'t exist',
            };
            res.status(400).json(result);
        }
    },

    // function to delete a specific message
    deleteSpecific: async (req, res) => {
        const result = {};
        let _status = 200;// eslint-disable-line
        const tempMessages = await deleteSpecificMessage(req.params.id);
        if (tempMessages) {
            result.status = _status;
            result.data = tempMessages;
            res.status(_status).json(result);
        } else {
            result.data = {
                message: 'Message doesn\'t exist',
            };
            res.status(400).json(result);
        }
    },
};


export default messagesController;
