import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import BadRequestError from "../errors/BadRequestError";

export default class ValidationMiddleware {
  /**
   * Middleware genérico para validar dados com Joi
   * @param {Joi.Schema} schema - O schema Joi para validação
   * @param {string} [property='body'] - A propriedade da requisição a ser validada (body, params, query, etc.)
   */
  static validate(schema: Joi.Schema, property: 'body' | 'query' | 'params' = 'body') {
    return async (req: Request, _res: Response, next: NextFunction) => {
      try {
        await schema.validateAsync(req[property], { abortEarly: false });
        next();
      } catch(error: unknown) {
        if (error instanceof Joi.ValidationError) {
          next(new BadRequestError(error.message));
        }
        next(error);
      }
    }
  }
}