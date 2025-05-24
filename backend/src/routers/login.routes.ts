import { Router } from "express";
import LoginController from "../controllers/login";

const loginRouter = Router();
const loginController: LoginController = new LoginController;

loginRouter.post('/', async (req, res, next) => {
  await loginController.login(req, res, next) 
});

export default loginRouter;