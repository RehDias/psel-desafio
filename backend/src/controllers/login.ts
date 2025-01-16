import { Request, Response, NextFunction } from "express";
import LoginService from "../services/login";
import LoginToken from "../interfaces/LoginToken";

export default class LoginController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await LoginService.checkLogin(req.body);
      const token = LoginToken.createToken(user);
      res.json({ token });
    } catch (err) {
      next(err);
    }
  }
}
