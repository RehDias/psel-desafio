import BadRequestError from "../errors/BadRequestError";
import { Account } from "../interfaces/Account";
import { Model } from "../interfaces/model";
import AccountModel from "../models/AccountModel";
import Service from "./service";

export default class AccountService extends Service<Account> {
  constructor(model: Model<Account> = new AccountModel()) {
    super(model);
  }

  async update(id: number, obj: Account): Promise<void> {
    const model = this.model as Model<Account>;
    if (model.update === undefined) {
      throw new BadRequestError('Não é possível realizar atualizações!!');
    }
    if (obj.cpf_cnpj !== undefined) {
      throw new BadRequestError('Não é possível alterar CPF ou CNPJ!!')
    } else {
      await model.update(id, obj);
    }
  }
}