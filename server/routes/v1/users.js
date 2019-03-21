import usersController from '../../controllers/v1/users';

const goTo = (router) => {
    router.route('/auth/signup')
        .post(usersController.signup);
    router.route('/auth/login')
        .post(usersController.login);
    router.route('/')
        .get(usersController.welcomMessage);
};

export default goTo;
