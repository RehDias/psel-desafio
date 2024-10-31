import AccountSequelize from "../database/models/account.model";
import { Account } from "../interfaces/Account";
import { Model, NewEntity } from "../interfaces/model";

export default class AccountModel implements Model<Account> {
  private model = AccountSequelize;
  async create(obj: NewEntity<Account>): Promise<Partial<Account>[]> {
    const newAccount = await this.model.create(obj);
    newAccount.save();
    return [newAccount.dataValues];
  }

  async find(): Promise<Partial<Account>[]> {
      const accounts = await this.model.findAll();
      return accounts;
  }

  async findById(id: number): Promise<Partial<Account> | null> {
    const account = await this.model.findByPk(id);
    return account;
  }

  async update(id: number, obj: Account): Promise<void> {
      await this.model.update(obj, { where: { id } });
  }

  async delete(id: number): Promise<void> {
      await this.model.destroy({ where: { id }});
  }
}