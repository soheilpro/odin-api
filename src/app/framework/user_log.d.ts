interface IUserLog extends IEntity {
  dateTime: Date;
  user: IEntity;
  action: string;
  params: any
}

interface IUserLogFilter extends IFilter {
}

interface IUserLogChange extends IChange {
}

interface IUserLogRepository extends IRepository<IUserLog, IUserLogFilter, IUserLogChange> {
}