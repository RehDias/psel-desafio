import { Request, Response, NextFunction } from "express";
import { Account } from "../interfaces/Account";
import AccountService from "../services/account";
import Service from "../services/service";
import Controller from "./controller";

export default class AccountController extends Controller<Account> {
  constructor(service: Service<Account> = new AccountService) {
    super(service);
  }
}