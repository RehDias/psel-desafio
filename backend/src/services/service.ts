import BadRequestError from "../errors/BadRequestError";
import { Model, SimpleModel } from "../interfaces/model";

export default abstract class Service<T> {
  protected model: Model<T> | SimpleModel<T>;

  constructor(model: Model<T> | SimpleModel<T>) {
    this.model = model;
  }

  async create(obj: T): Promise<Partial<T>[] | undefined> {
    const newAccount = await this.model.create(obj);
    return newAccount;
  }

  async find(): Promise<Partial<T>[]> {
    const findAllAccount = await this.model.find();
    return findAllAccount;
  }

  async findById(id: number): Promise<Partial<T> | null> {
    const findOne = await this.model.findById(id);
    return findOne;
  }

  async findOne(item: string): Promise<Partial<T> | null> {
    const found = await this.model.findOne(item);
    return found;
  }

  async update(id: number, obj: T): Promise<void> {
    const model = this.model as Model<T>;
    if (model.update === undefined) {
      throw new BadRequestError('Não é possível realizar atualizações!!');
    }

    await model.update(id, obj);
  }

  async delete(id: number): Promise<void> {
    const model = this.model as Model<T>;
    if (model.delete === undefined) {
      throw new Error('error');
    }

    await model.delete(id);
  }
}