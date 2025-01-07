import { Account } from "../interfaces/Account";
import { Model } from "../interfaces/model";
import AccountModel from "../models/AccountModel";
import Service from "./service";

export default class AccountService extends Service<Account> {
  constructor(model: Model<Account> = new AccountModel()) {
    super(model);
  }
}