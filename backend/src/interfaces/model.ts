export type NewEntity<T> = Omit<T, 'id'>;

export interface SimpleModel<T> {
  create(obj: T): Promise<Partial<T> | undefined>;
  find(): Promise<Partial<T>[]>;
  findById(id: number): Promise<Partial<T> | null>;
  findOne(item: string | number): Promise<Partial<T> | null>;
}

export interface Model<T> extends SimpleModel<T> {
  update(id: number, obj: T): Promise<T>;
  delete(id: number): Promise<void>;
}