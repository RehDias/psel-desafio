import UnauthorizedError from "../errors/UnauthorizedError";
import { LoginInterface } from "../interfaces/Login";
import AccountModel from "../models/AccountModel";
import AccountService from "./account";

export default class LoginService {
  static account: AccountService = new AccountService(new AccountModel());

  static async checkLogin (obj: LoginInterface) {        
    const user = await this.account.findOne(obj.cpf_cnpj);
    
    if (!user || obj.password !== user.password) throw new UnauthorizedError("Credenciais inválidas.");
    return user;
  }
}