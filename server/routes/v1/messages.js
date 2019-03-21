import messageController from '../../controllers/v1/messages';

const goTo = (router) => {// eslint-disable-line
    router.route('/messages')
        .post(messageController.send);
    router.route('/messages/unread')
        .get(messageController.fetchAllUnread);
    router.route('/messages/sent')
        .get(messageController.fetchAllSent);
    router.route('/messages/:id')
        .get(messageController.fetchSpecific);
    router.route('/messages/:id')
        .delete(messageController.deleteSpecific);
    router.route('/messages')
        .get(messageController.fetchAll);
};

export default goTo;
