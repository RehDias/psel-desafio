import AccountSequelizeModel, { AccountFields } from "../database/models/account.model";
import { SimpleModel } from "../interfaces/model";

export default class AccountModel implements SimpleModel<AccountFields> {
  async create(obj: AccountFields): Promise<void> {
    const newAccount = await AccountSequelizeModel.create(obj);
    newAccount.save();
  }
  async findAll(): Promise<Partial<AccountFields>[]> {
    const findAllAccount = await AccountSequelizeModel.findAll();
    return findAllAccount as unknown as AccountFields[];
  }
  async findById(id: number): Promise<Partial<AccountFields>> {
    const findOne = await AccountSequelizeModel.findByPk(id);
    return findOne as unknown as AccountFields;
  }

}