import usersRouter from './users';

const routes = (router) => {
    usersRouter(router);
    return router;
};

export default routes;
