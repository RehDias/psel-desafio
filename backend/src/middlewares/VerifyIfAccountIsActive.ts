import { NextFunction, Request, Response } from "express";
import AccountModel from "../models/AccountModel";
import BadRequestError from "../errors/BadRequestError";

export default class VerifyIfAccountIsActive {
  static async isAccountActive (req: Request, _res: Response, next: NextFunction) {
    const { id } = req.params;
    const accountModel = new AccountModel();
    try {
      const account = await accountModel.findById(Number(id));
      if (account?.account_status == false) {
        next(new BadRequestError('Conta inativa, por favor verifique a conta e tente novamente!'));
      } else {
        next()
      }
    } catch (err) {
      next(new BadRequestError('Erro ao verificar conta!'))
    }
  }
}