import usersController from '../../controllers/v2/users';

const goTo = (router) => {
    router.route('/auth/signup')
        .post(usersController.signup);
    router.route('/auth/login')
        .post(usersController.login);
};

export default goTo;
