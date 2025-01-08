import UnauthorizedError from "../errors/UnauthorizedError";
import AccountModel from "../models/AccountModel";

export default class LoginService {
  account: AccountModel = new AccountModel;

  async checkLogin (email: string, password: string) {
    const user = await this.account.findOne(email);
    if (!user || password !== user.password) throw new UnauthorizedError("E-mail ou senha inválidos.");
    return user;
  }
}