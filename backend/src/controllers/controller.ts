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
      if (!findall) throw new Error('criar erro');
      return res.status(200).json(findall);
    } catch (err) {
      next(err);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const findOne = await this.service.findById(Number(id));
      if (!findOne) throw new Error('criar erro');
      return res.status(200).json(findOne);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const obj = req.body;
    const { id } = req.params;
    try {
      await this.service.update(Number(id), obj);
      res.status(204).send();
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