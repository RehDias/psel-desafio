import { Model } from "../interfaces/model";
import { Transaction } from "../interfaces/Transaction";
import TransactionModel from "../models/TransactionModel";
import Service from "./service";

export default class TransactionService extends Service<Transaction> {
  constructor(model: Model<Transaction> = new TransactionModel()) {
    super(model);
  }

  async findOne(account_id: string, transactionId?: number) {
    const transactionModel = this.model as TransactionModel;
    return await transactionModel.findOne(account_id, transactionId);
  }

  async find(accountId?: string): Promise<Partial<Transaction>[]> {
    const model = this.model as TransactionModel;
    return await model.find(accountId);
  }

  async create(obj: Transaction): Promise<Partial<Transaction>[]> {
    const model = this.model as TransactionModel;
    return await model.create(obj);
  }
}