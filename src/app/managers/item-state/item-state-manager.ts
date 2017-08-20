import { IItemState, IItemStateFilter, IItemStateChange, IItemStateManager, IItemStateRepository } from '../../framework/item-state';
import ManagerBase from '../manager-base';

const ItemKindRegEx = /.+/;
const TitleRegEx = /.+/;
const KeyRegEx = /.+/;

export class ItemStateManager extends ManagerBase<IItemState, IItemStateFilter, IItemStateChange> implements IItemStateManager {
  constructor(repository: IItemStateRepository) {
    super(repository);
  }

  validateEntity(entity: IItemState) {
    if (entity.itemKind === undefined)
      return { message: 'Missing itemKind.' };

    if (!ItemKindRegEx.test(entity.itemKind))
      return { message: 'Invalid itemKind.' };

    if (entity.title === undefined)
      return { message: 'Missing title.' };

    if (!TitleRegEx.test(entity.title))
      return { message: 'Invalid title.' };

    if (entity.key === undefined)
      return { message: 'Missing key.' };

    if (!KeyRegEx.test(entity.key))
      return { message: 'Invalid key.' };

    if (entity.order === undefined)
      return { message: 'Missing order.' };

    if (isNaN(entity.order))
      return { message: 'Invalid order.' };

    if (entity.order < 0)
      return { message: 'Invalid order.' };

    return null;
  }

  validateChange(change: IItemState) {
    console.log(change);

    if (change.itemKind !== undefined) {
      if (!ItemKindRegEx.test(change.itemKind))
        return { message: 'Invalid itemKind.' };
    }

    if (change.title !== undefined) {
      if (!TitleRegEx.test(change.title))
        return { message: 'Invalid title.' };
    }

    if (change.key !== undefined) {
      if (!KeyRegEx.test(change.key))
        return { message: 'Invalid key.' };
    }

    if (change.order !== undefined) {
      if (isNaN(change.order))
        return { message: 'Invalid order.' };

      if (change.order < 0)
        return { message: 'Invalid order.' };
    }

    return null;
  }

  getEntityDuplicateCheckFilter(entity: IItemState) {
    return {
      key: entity.key,
    };
  }

  getChangeDuplicateCheckFilter(change: IItemStateChange) {
    return change.key !== undefined ? { key: change.key } : undefined;
  }
}
