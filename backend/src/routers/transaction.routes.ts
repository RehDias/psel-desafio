import { Router } from "express";
import TransactionController from "../controllers/transaction";
import Authenticate from "../middlewares/Authenticate";
import VerifyIfAccountIsActive from "../middlewares/VerifyIfAccountIsActive";

const transactionRouter = Router();
const transacrionController = new TransactionController;

transactionRouter.get('/:id', Authenticate.autheticate, VerifyIfAccountIsActive.isAccountActive,
  async (req, res, next) => {
  await transacrionController.find(req, res, next);
});
transactionRouter.get('/:id/:trId', Authenticate.autheticate, VerifyIfAccountIsActive.isAccountActive, 
  async (req, res, next) => {
  await transacrionController.findOne(req, res, next);
});
transactionRouter.post('/:id', Authenticate.autheticate, VerifyIfAccountIsActive.isAccountActive,
  async (req, res, next) => {
  await transacrionController.create(req, res, next);
});
transactionRouter.put('/:id/:trId', Authenticate.autheticate, VerifyIfAccountIsActive.isAccountActive,
  async (req, res, next) => {
  await transacrionController.update(req, res, next);
});
transactionRouter.delete('/:id/:trId', Authenticate.autheticate, VerifyIfAccountIsActive.isAccountActive,
  async (req, res, next) => {
  await transacrionController.delete(req, res, next);
});
transactionRouter.patch('/:id/cashback/:trId', Authenticate.autheticate, VerifyIfAccountIsActive.isAccountActive,
  async (req, res, next) => {
    await transacrionController.updateCashback(req, res, next);
});

export default transactionRouter;