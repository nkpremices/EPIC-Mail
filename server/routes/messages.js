import messageController from '../controllers/messages';

const goTo = (router) => {// eslint-disable-line
    router.route('/messages')
        .post(messageController.send);
    router.route('/messages/unread')
        .get(messageController.fetchAllUnread);
    router.route('/messages')
        .get(messageController.fetchAll);
};

export default goTo;
