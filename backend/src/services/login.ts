import UnauthorizedError from "../errors/UnauthorizedError";
import { Account } from "../interfaces/Account";
import AccountModel from "../models/AccountModel";
import AccountService from "./account";
import bcrypt from "bcrypt";

export default class LoginService {
  static account: AccountModel = new AccountModel();

static async checkLogin(obj: { cpf_cnpj: string; password: string }): Promise<Partial<Account>> {
  if (!obj.cpf_cnpj || !obj.password) {
    throw new UnauthorizedError("Credenciais inválidas.");
  }
  const userInstance = await this.account.findOne(obj.cpf_cnpj);
  
  if (!userInstance || !userInstance.password) {
    throw new UnauthorizedError("Credenciais inválidas.");
  }

  const passwordMatch = await bcrypt.compare(obj.password, userInstance.password);  

  if (!passwordMatch) {
    throw new UnauthorizedError("Credenciais inválidas.");
  }

  const { password, ...userWithoutPassword } = userInstance;

  return userWithoutPassword;
}

}