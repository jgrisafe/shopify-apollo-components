'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateFlowTypes;

var _index = require('./index');

var _constants = require('../constants');

function generateFlowTypes(_ref) {
  var args = _ref.args;

  return args.map(function (_ref2) {
    var name = _ref2.name,
        type = _ref2.type;
    return {
      name: name,
      type: (0, _index.getTypeByName)((0, _index.getType)(type)) || type,
      typeDefinition: (0, _index.getFullType)(type)
    };
  }).filter(function (_ref3) {
    var name = _ref3.name,
        type = _ref3.type;
    return name && type;
  }).sort(sortInputFields).map(function (_ref4) {
    var name = _ref4.name,
        type = _ref4.type,
        typeDefinition = _ref4.typeDefinition;

    var flowKey = '' + name + (typeDefinition.endsWith('!') ? '' : '?');
    return flowKey + ': ' + (0, _index.generateFlowTypeTemplate)(type) + ',';
  }).join('\n        ');
}

function sortInputFields(field) {
  if (field.type.kind !== _constants.GQL_TYPE_KINDS.INPUT_OBJECT) return -1;
  return 1;
}