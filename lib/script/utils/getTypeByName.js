'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getTypeByName;

var _constants = require('../constants');

function getTypeByName(name) {
  for (var i = 0; i < _constants.TYPES.length; i += 1) {
    var type = _constants.TYPES[i];
    if (name === type.name) return type;
  }

  return null;
}