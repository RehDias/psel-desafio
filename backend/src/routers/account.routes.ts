import { Router } from "express";
import AccountController from "../controllers/account";
import ValidationMiddleware from "../middlewares/ValidationMiddleware";
import { accountSchema, updateSchema } from "../interfaces/joiSchemas";
import Authenticate from "../middlewares/Authenticate";

const accountRouter = Router();
const accountController = new AccountController;

accountRouter.get('/', async (req, res, next) => {
  await accountController.find(req, res, next);
});
accountRouter.get('/:id', async (req, res, next) => {
  await accountController.findOne(req, res, next);
});
accountRouter.post('/', ValidationMiddleware.validate(accountSchema),
  async (req, res, next) => {
  await accountController.create(req, res, next);
});
accountRouter.put('/:id', Authenticate.autheticate,
  ValidationMiddleware.validate(updateSchema), 
  async (req, res, next) => {
  await accountController.update(req, res, next);
});
accountRouter.delete('/:id', Authenticate.autheticate, async (req, res, next) => {
  await accountController.delete(req, res, next);
});

export default accountRouter;