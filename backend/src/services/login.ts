import UnauthorizedError from "../errors/UnauthorizedError";
import AccountModel from "../models/AccountModel";

export default class LoginService {
  static account: AccountModel = new AccountModel;

  static async checkLogin (obj: any) {
    const user = await this.account.findOne(obj.email);
    if (!user || obj.password !== user.password) throw new UnauthorizedError("E-mail ou senha inválidos.");
    return user;
  }
}