import { ItemAreaRepository } from '../repositories/item_area';
import { IUserPermission, UserPermissionHelper } from '../helpers/user_permission';

var express = require('express');
var async = require('async');
var _ = require('underscore');

var router = express.Router();

router.get('/', (request: any, response: any, next: any) => {
  var repository = new ItemAreaRepository();

  repository.getAll({}, (error, areas) => {
    if (error)
      return next(error);

    response.json({
      data: areas
    });
  });
});

router.post('/', (request: any, response: any, next: any) => {
  if (!UserPermissionHelper.hasPermission(request.user.permissions, null, 'admin'))
    return response.sendStatus(403);

  var area: IItemArea = {};

  if (request.param('title'))
    area.title = request.param('title');

  if (request.param('project_id'))
    area.project = objectFromId(request.param('project_id'));

  var repository = new ItemAreaRepository();

  repository.insert(area, (error, area) => {
    if (error)
      return next(error);

    response.json({
      data: area
    });
  });
});

router.patch('/:areaId', (request: any, response: any, next: any) => {
  if (!UserPermissionHelper.hasPermission(request.user.permissions, null, 'admin'))
    return response.sendStatus(403);

  var repository = new ItemAreaRepository();
  var change: IItemAreaChange = {};

  if (request.param('title') !== undefined)
    change.title = request.param('title');

  if (request.param('project_id') !== undefined)
    if (request.param('project_id'))
      change.project = objectFromId(request.param('project_id'));
    else
      change.project = null;

  repository.update(request.param('areaId'), change, (error, area) => {
    if (error)
      return next(error);

    response.json({
      data: area
    });
  });
});

function objectFromId(id: string) {
  return {
    id: id
  };
}

export = router;
