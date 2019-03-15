import messageController from '../controllers/messages';

const goTo = (router) => {// eslint-disable-line
    router.route('/messages')
        .post(messageController.send);
};

export default goTo;
