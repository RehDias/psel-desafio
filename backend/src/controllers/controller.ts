import { NextFunction, Request, Response } from "express";
import Service from "../services/service";

export default abstract class Controller<T> {
  protected service: Service<T>

  constructor(service: Service<T>) {
    this.service = service;
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const created = await this.service.create(req.body);
      return res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  }

  async find(_req: Request, res: Response, next: NextFunction) {
    try {
      const findall = await this.service.find();
      return res.status(200).json(findall);
    } catch (err) {
      next(err);
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const findItem = await this.service.findById(Number(id));
      return res.status(200).json(findItem);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const obj = req.body;
    const { id } = req.params;
    try {
      await this.service.update(Number(id), obj);
      res.status(201).json({ message: 'Atualizado com sucesso!' });
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      await this.service.delete(Number(id));
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}