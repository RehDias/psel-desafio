import { Request, Response, NextFunction } from "express";
import LoginService from "../services/login";
import LoginToken from "../interfaces/LoginToken";

export default class LoginController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      
      const user = await LoginService.checkLogin(req.body);
      
      if (!user.cpf_cnpj || !user.password) {
        throw new Error('Invalid user data: cpf_cnpj and password are required');
      }
      const token = LoginToken.createToken({
        cpf_cnpj: user.cpf_cnpj,
        password: user.password
      });
      
      res.json({ token, user });
    } catch (err) {
      next(err);
    }
  }
}
