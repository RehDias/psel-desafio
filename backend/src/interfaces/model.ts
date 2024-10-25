export interface SimpleModel<T> {
  create(obj: T): Promise<void>;
  findAll(): Promise<Partial<T>[]>;
  findById(id: number): Promise<Partial<T>> | null;
}

export interface Model<T> extends SimpleModel<T> {
  update(id: number, obj: T): Promise<void>;
  delete(id: number): Promise<void>;
}