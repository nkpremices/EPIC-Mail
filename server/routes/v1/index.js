import usersRouter from './users';
import messagesRouter from './messages';

const routes = (router) => {
    usersRouter(router);
    messagesRouter(router);
    return router;
};

export default routes;
