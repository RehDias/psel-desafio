import { Request, Response, NextFunction } from "express";
import { Account } from "../interfaces/Account";
import AccountService from "../services/account";
import Service from "../services/service";
import Controller from "./controller";
import BadRequestError from "../errors/BadRequestError";

export default class AccountController extends Controller<Account> {
  constructor(service: Service<Account> = new AccountService) {
    super(service);
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const obj = req.body;
    const { id } = req.params;
    try {
      await this.service.update(Number(id), obj);
      res.status(201).json({ message: 'Conta atualizada com sucesso!!' });
    } catch (err) {
      if (err instanceof BadRequestError) { 
        next(new BadRequestError(err.message));
      } 
      next(err);
    }
  }
}