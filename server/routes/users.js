import usersController from '../controllers/users';

const goTo = (router) => {
    router.route('/auth/signup')
        .post(usersController.signup);
};

export default goTo;
