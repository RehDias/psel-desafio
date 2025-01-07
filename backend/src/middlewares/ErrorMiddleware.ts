import { NextFunction, Request, Response } from "express";
import HttpError from "../errors/HttpError";

export default class ErrorMiddleware {
  static handleErr(err: HttpError, _req: Request, res: Response, _next: NextFunction) {
    if (err instanceof HttpError) {
      return res.status(Number(err.statusCode)).json({ message: err.message });
    }
    return res.status(500).json({ message: 'Erro interno!'});
  }
}