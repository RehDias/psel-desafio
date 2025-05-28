import { Request, Response, NextFunction } from "express";
import LoginService from "../services/login";
import LoginToken from "../interfaces/LoginToken";

export default class LoginController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { cpf_cnpj, password } = req.body;
      
      if (!cpf_cnpj || !password) {
        throw new Error('Invalid user data: cpf_cnpj and password are required');
      }

      const user = await LoginService.checkLogin(req.body);

      const token = LoginToken.createToken({
        cpf_cnpj: req.body.cpf_cnpj,
        id: user.id,
      });
      
      res.json({ token, user });
    } catch (err) {
      next(err);
    }
  }
}
