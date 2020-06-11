import express from 'express';

const routes = express.Router();

/**
 * Rota "user"
 * default Controllers = index, show, create, update, delete 
 */
import UserController from "./controllers/userController";
const userController = new UserController();
routes.post("/user/create", userController.create);
routes.get("/user/authenticate", userController.show);

/**
 * Autenticação do Header Authorization em todas as rotas após essa!!
 */
import auth from './middlewares/auth';
routes.use(auth)

/**
 * Todas as rotas que precisam de autorização
 */

export default routes;