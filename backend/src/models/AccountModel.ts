import { UniqueConstraintError } from "sequelize";
import AccountSequelize from "../database/models/account.model";
import BadRequestError from "../errors/BadRequestError";
import { Account } from "../interfaces/Account";
import { Model, NewEntity } from "../interfaces/model";
import bcrypt from "bcrypt";
import NotFoundError from "../errors/NotFoundError";

export default class AccountModel implements Model<Account>{
  private model = AccountSequelize;
  async create(obj: NewEntity<Account>): Promise<Partial<Account> | undefined> {
  try {
    const accountExist = await this.model.findOne({ where: { cpf_cnpj: obj.cpf_cnpj } });
    
    const hashedPassword = obj.password = await bcrypt.hash(obj.password, 10);
    const updatedObj = { ...obj, password: hashedPassword}

    if (accountExist && accountExist.account_status === false) {
      
      await this.model.update({
        name: obj.name,
        email: obj.email,
        password: hashedPassword,
        account_status: true
       }, { where: { cpf_cnpj: obj.cpf_cnpj } });

      const updatedAccount = await this.model.findOne({ where: { cpf_cnpj: obj.cpf_cnpj } });

      if (updatedAccount) {
        const { password, ...accountWithoutPassword } = updatedAccount.dataValues;
        return accountWithoutPassword;
      }

      return undefined;
    }

    if (accountExist && accountExist.account_status === true) {
      throw new BadRequestError('Conta com este CPF/CNPJ já está ativa.');
    }

    const newAccount = await this.model.create(updatedObj);
    const { password, ...accountWithoutPassword } = newAccount.dataValues;

    return accountWithoutPassword;

  } catch (error: unknown) {
    if (error instanceof UniqueConstraintError) {
      throw new BadRequestError('Não foi possível criar a conta: o CPF/CNPJ informado já está cadastrado.');
    }
    throw error;
  }
}

  async find(): Promise<Partial<Account>[]> {
      const accounts = await this.model.findAll();
      const accountsWithoutPassword = accounts.map(({ dataValues }) => {
        const { password, ...rest } = dataValues;
        return rest;
      });
      return accountsWithoutPassword;
  }

  async findById(id: number): Promise<Partial<Account> | null> {
    const account = await this.model.findByPk(id);
    if (!account) {
      throw new NotFoundError('Conta não encontrada!');
    }
    const { password, ...userWithoutPassword } = account.dataValues;

    return userWithoutPassword;   
  }

  async findOne(cpf_cnpj: string): Promise<Partial<Account> | null> {
      const found = await this.model.findOne({ where: { cpf_cnpj } });

     return found?.dataValues || null;
  }

  async update(id: number | undefined, obj: Partial<Account>): Promise<Account> {
    await this.model.update(obj, { where: { id } });
    const updatedAccount = await this.model.findByPk(id);
    if (!updatedAccount) {
      throw new NotFoundError('Conta não encontrada!');
    }
    return updatedAccount.dataValues;
  }

  async delete(id: number): Promise<void> {
      await this.model.update({account_status: false}, { where: { id } });
  }
}