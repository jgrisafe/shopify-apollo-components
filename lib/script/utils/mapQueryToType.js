'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (query, operationType) {
  var mappedTypeName = (0, _index.getInnerType)(query.type).name;
  var type = (0, _index.getTypeByName)(mappedTypeName);
  if (type) {
    return {
      operationType: operationType,
      args: query.args,
      name: query.name,
      fields: type.fields
    };
  }
  return null;
};

var _index = require('./index');