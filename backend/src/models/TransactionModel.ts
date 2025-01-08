import TransactionSequelize from "../database/models/transaction.model";
import { Model, NewEntity } from "../interfaces/model";
import { Transaction } from "../interfaces/Transaction";

export default class TransactionModel implements Model<Transaction> {
  private model = TransactionSequelize;
  async create(obj: NewEntity<Transaction>): Promise<Partial<Transaction>[]> {
    const newTransaction = await this.model.create(obj);
    newTransaction.save();
    return [newTransaction.dataValues];
  }

  async find(): Promise<Partial<Transaction>[]> {
      const transaction = await this.model.findAll();
      return transaction;
  }

  async findById(id: number): Promise<Partial<Transaction> | null> {
    const transaction = await this.model.findByPk(id);
    return transaction;
  }

  async findOne(account_id: string | number): Promise<Partial<Transaction> | null> {
      const found = await this.model.findOne({ where: { account_id } });
      return found;
  }

  async update(id: number, obj: Transaction): Promise<void> {
      await this.model.update(obj, { where: { id } });
  }

  async delete(id: number): Promise<void> {
      await this.model.destroy({ where: { id }});
  }
}