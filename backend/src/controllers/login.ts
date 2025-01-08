import { Request, Response, NextFunction } from "express";
import LoginService from "../services/login";
import LoginToken from "../interfaces/loginToken";

export default class LoginController {
  service: LoginService = new LoginService;

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.service.checkLogin(req.body.email, req.body.password);
      const token = await LoginToken.createToken(user.email, user.password);
      res.json({ token });
    } catch (err) {
      next(err);
    }
  }
}
