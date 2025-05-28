import { NextFunction, Request, Response } from "express";
import LoginToken from "../interfaces/LoginToken";
import UnauthorizedError from "../errors/UnauthorizedError";

export default class Authenticate {
  static async autheticate(req: Request, _res: Response, next: NextFunction) {
  const { id } = req.params;

  try {
    const decoded = LoginToken.readToken(req.headers.authorization);

    if (typeof decoded !== 'object' || decoded === null || !('id' in decoded)) {
      return next(new UnauthorizedError('Token inválido!'));
    }

    if (Number(decoded.id) === Number(id)) {
      next();
    } else {
      next(new UnauthorizedError('Não autorizado para realizar essa ação!'));
    }

    } catch (error) {
      next(new UnauthorizedError('Token inválido!'));
    }
  }
}