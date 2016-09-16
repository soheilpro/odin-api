import { BaseUpdater } from './base'
import { IDocument } from '../db'

var async = require('async');

export class v4 extends BaseUpdater {
  getVersion(): number {
    return 4;
  }

  getTasks(): Function[] {
    var tasks: Function[] = [];

    tasks.push((callback: (error: Error) => void) => {
      var update = {
        $unset: {
          'creationDateTime': true,
          'modificationDateTime': true
        }
      };

      this.db.update('items', {}, update, { multi: true }, callback);
    });

    return tasks;
  }
}