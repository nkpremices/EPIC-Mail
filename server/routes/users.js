import { module } from '../controllers/users';

const users = (router) => {
    router.route('/users')
        .post(module.add);
};

export { users };// eslint-disable-line
