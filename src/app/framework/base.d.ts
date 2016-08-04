interface IEntity {
  id: string;
}

interface IFilter {
  id?: string;
}

interface IChange {
}

interface IGetAllCallback<TEntity extends IEntity> {
  (error: Error, entities?: TEntity[]): any
}

interface IGetCallback<TEntity extends IEntity> {
  (error: Error, entity?: TEntity): any
}

interface IInsertCallback<TEntity extends IEntity> {
  (error: Error, entity?: TEntity): any
}

interface IUpdateCallback<TEntity extends IEntity> {
  (error: Error, entity?: TEntity): any
}

interface IDeleteCallback {
  (error: Error): any
}

interface IRepository<TEntity extends IEntity, TFilter extends IFilter, TChange extends IChange> {
  getAll(filter: TFilter, callback: IGetAllCallback<TEntity>);
  get(filter: TFilter, callback: IGetCallback<TEntity>);
  insert(entity: TEntity, callback: IInsertCallback<TEntity>);
  update(id: string, change: TChange, callback: IUpdateCallback<TEntity>)
  delete(id: string, callback: IDeleteCallback)
}