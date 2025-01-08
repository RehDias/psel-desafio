import { UniqueConstraintError } from "sequelize";
import AccountSequelize from "../database/models/account.model";
import BadRequestError from "../errors/BadRequestError";
import { Account } from "../interfaces/Account";
import { Model, NewEntity } from "../interfaces/model";

export default class AccountModel implements Model<Account> {
  private model = AccountSequelize;
  async create(obj: NewEntity<Account>): Promise<Partial<Account>[] | undefined> {
    try {
      const newAccount = await this.model.create(obj);
      newAccount.save();
      return [newAccount.dataValues];
    } catch (error: unknown) {
      if (error instanceof UniqueConstraintError) {
        throw new BadRequestError('Não foi possível criar a conta: o CPF/CNPJ informado já está cadastrado.')
      }
    }
  }

  async find(): Promise<Partial<Account>[]> {
      const accounts = await this.model.findAll();
      return accounts;
  }

  async findById(id: number): Promise<Partial<Account> | null> {
    const account = await this.model.findByPk(id);
    return account;
  }

  async findOne(email: string | number): Promise<Partial<Account> | null> {
      const found = await this.model.findOne({ where: { email } });
      return found;
  }

  async update(id: number, obj: Account): Promise<void> {
      await this.model.update(obj, { where: { id } });
  }

  async delete(id: number): Promise<void> {
      await this.model.update({account_status: false}, { where: { id } });
  }
}