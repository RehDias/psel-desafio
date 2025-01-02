import { Router } from "express";
import TransactionController from "../controllers/transaction";

const transactionRouter = Router();
const transacrionController = new TransactionController;
transactionRouter.get('/', async (req, res, next) => {
  await transacrionController.find(req, res, next);
});
transactionRouter.get('/:id', async (req, res, next) => {
  await transacrionController.findOne(req, res, next);
});
transactionRouter.post('/', async (req, res, next) => {
  await transacrionController.create(req, res, next);
});
transactionRouter.put('/:id', async (req, res, next) => {
  await transacrionController.update(req, res, next);
});
transactionRouter.delete('/:id', async (req, res, next) => {
  await transacrionController.delete(req, res, next);
});

export default transactionRouter;