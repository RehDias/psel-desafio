import TransactionSequelize from "../database/models/transaction.model";
import { Model } from "../interfaces/model";
import { Transaction } from "../interfaces/Transaction";

export default class TransactionModel implements Model<Transaction> {
  private model = TransactionSequelize;
  
  async create(obj: Transaction): Promise<Partial<Transaction>> {
    const newTransaction = await this.model.create(obj);
    newTransaction.save();
    return newTransaction.dataValues;
  }

  async find(accountId?: string): Promise<Partial<Transaction>[]> {
      const transaction = await this.model.findAll({ where: { account_id: accountId } });
      return transaction;
  }

  async findById(trId: number): Promise<Partial<Transaction> | null> {
    const transaction = await this.model.findByPk(trId);
    return transaction;
  }

  async findOne(account_id: string, transactionId?: number): Promise<Partial<Transaction> | null> {
      const found = await this.model.findOne({ where: { account_id, transactionId } });
      return found;
  }

  async update(trId: number, obj: Partial<Transaction>): Promise<void> {
      await this.model.update(obj, { where: { transactionId: trId } });
  }

  async delete(trId: number): Promise<void> {
      await this.model.destroy({ where: { transactionId: trId }});
  }
}