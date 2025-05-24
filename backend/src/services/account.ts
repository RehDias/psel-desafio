import BadRequestError from "../errors/BadRequestError";
import NotFoundError from "../errors/NotFoundError";
import { Account } from "../interfaces/Account";
import { Model } from "../interfaces/model";
import AccountModel from "../models/AccountModel";
import Service from "./service";

export default class AccountService extends Service<Account> {
  constructor(model: Model<Account> = new AccountModel()) {
    super(model);
  }

  async update(id: number, obj: Partial<Account>): Promise<void> {
    const model = this.model as Model<Account>;
    if (model.update === undefined) {
      throw new BadRequestError('Não é possível realizar atualizações!!');
    }
    if ('cpf_cnpj' in obj) {
      throw new BadRequestError('Não é permitido alterar CPF ou CNPJ!!');
    }

    await model.update(id, obj as Account);
  }

  async findById(id: number): Promise<Partial<Account>> {
  const account = await this.model.findById(id);
  
  if (!account) {
    throw new NotFoundError('Conta não encontrada!');
  }
  return account;
}
}