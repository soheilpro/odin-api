import { IUserLog, IUserLogFilter, IUserLogChange, IUserLogManager, IUserLogRepository } from '../../framework/user-log';
import ManagerBase from '../manager-base';

const ActionRegEx = /.+/;

export class UserLogManager extends ManagerBase<IUserLog, IUserLogFilter, IUserLogChange> implements IUserLogManager {
  constructor(repository: IUserLogRepository) {
    super(repository);
  }

  validateEntity(entity: IUserLog) {
    if (entity.dateTime === undefined)
      return { message: 'Missing dateTime.' };

    if (entity.dateTime === null)
      return { message: 'Invalid dateTime.' };

    if (entity.user === undefined)
      return { message: 'Missing user.' };

    if (entity.user === null)
      return { message: 'Invalid user.' };

    if (entity.action === undefined)
      return { message: 'Missing action.' };

    if (!ActionRegEx.test(entity.action))
      return { message: 'Invalid action.' };

    return null;
  }
}
