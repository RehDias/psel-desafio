import { Model } from "../interfaces/model";
import { Transaction } from "../interfaces/Transaction";
import TransactionModel from "../models/TransactionModel";
import Service from "./service";

export default class TransactionService extends Service<Transaction> {
  constructor(model: Model<Transaction> = new TransactionModel()) {
    super(model);
  }
}