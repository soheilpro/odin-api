import { IManager } from '../imanager';
import { IProject } from './iproject';
import { IProjectFilter } from './iproject-filter';
import { IProjectChange } from './iproject-change';

export interface IProjectManager extends IManager<IProject, IProjectFilter, IProjectChange> {
}
