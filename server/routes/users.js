import usersController from '../controllers/users';

const goTo = (router) => {
    router.route('/auth/signup')
        .post(usersController.signup);
    router.route('/auth/login')
        .post(usersController.login);
    router.route('/')
        .get(usersController.welcomMessage);
};

export default goTo;
