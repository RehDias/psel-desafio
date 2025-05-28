import BadRequestError from "../errors/BadRequestError";
import { Model, SimpleModel } from "../interfaces/model";

export default abstract class Service<T extends object> {
  protected model: Model<T> | SimpleModel<T>;

  constructor(model: Model<T> | SimpleModel<T>) {
    this.model = model;
  }

  async create(obj: T): Promise<Partial<T> | undefined> {
    const created = await this.model.create(obj);
    return created;
  }

  async find(): Promise<Partial<T>[]> {
    const findAll = await this.model.find();
    return findAll;
  }

  async findById(id: number): Promise<Partial<T> | null> {
    const findById = await this.model.findById(id);
    return findById;
  }

  async findOne(item: string): Promise<Partial<T> | null> {   
    const found = await this.model.findOne(item);
    return found;
  }

  async update(id: number, obj: Partial<T>): Promise<Awaited<T> | null> {
    const model = this.model as Model<T>;
    if (model.update === undefined) {
      throw new BadRequestError('Não é possível realizar atualizações!!');
    }

    const updated = await model.update(id, obj as T);
    return updated;
  }

  async delete(id: number): Promise<void> {
    const model = this.model as Model<T>;
    if (model.delete === undefined) {
      throw new Error('error');
    }

    await model.delete(id);
  }
}