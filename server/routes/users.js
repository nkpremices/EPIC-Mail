import usersController from '../controllers/users';

const goTo = (router) => {
    router.route('/auth/signup')
        .post(usersController.signup);
    router.route('/auth/login')
        .post(usersController.login);
};

export default goTo;
