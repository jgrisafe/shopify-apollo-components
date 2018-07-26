'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateFlowTypeTemplate;

var _constants = require('../constants');

var _index = require('./index');

var CACHED_TYPES = {};

function generateFlowTypeTemplate(mainType) {
  if (mainType.kind === _constants.GQL_TYPE_KINDS.SCALAR) {
    return mapScalarTypes(mainType);
  }

  if (mainType.kind === _constants.GQL_TYPE_KINDS.INPUT_OBJECT && mainType.inputFields) {
    return '{\n          ' + mainType.inputFields.map(function (_ref) {
      var name = _ref.name,
          type = _ref.type;

      var rootTypeName = (0, _index.getType)(type);
      CACHED_TYPES[rootTypeName] = CACHED_TYPES[rootTypeName] || (0, _index.getTypeByName)(rootTypeName);
      return {
        name: name,
        fieldType: CACHED_TYPES[rootTypeName],
        typeDefinition: (0, _index.getFullType)(type)
      };
    }).map(function (_ref2) {
      var name = _ref2.name,
          fieldType = _ref2.fieldType,
          typeDefinition = _ref2.typeDefinition;

      var flowPrimitive = mapGraphqlTypeToFlowType(fieldType);
      var flowKey = '' + name + (typeDefinition.endsWith('!') ? '' : '?');
      return flowKey + ': ' + flowPrimitive;
    }).join(',\n          ') + '\n        }';
  }

  return mapGraphqlTypeToFlowType(mainType);
}

function mapGraphqlTypeToFlowType(type) {
  var _ref3 = type || {},
      kind = _ref3.kind;

  switch (kind) {
    case _constants.GQL_TYPE_KINDS.SCALAR:
      return mapScalarTypes(type);
    case _constants.GQL_TYPE_KINDS.ENUM:
      return generateEnumTypeString(type);

    // all types should be scalar or enum at this point, but we return any just to be safe and
    // cover our asses
    default:
      {
        return 'any';
      }
  }
}

function mapScalarTypes(type) {
  switch (type.name) {
    case 'Int':
    case 'Float':
      return 'number';
    case 'String':
    case 'DateTime':
      return 'string';
    case 'ID':
      return 'string | number';
    case 'Boolean':
      return 'boolean';
    default:
      return 'any';
  }
}

function generateEnumTypeString(_ref4) {
  var enumValues = _ref4.enumValues;

  return enumValues ? enumValues.map(function (val) {
    return '\'' + val.name + '\'';
  }).join(' | ') : 'any';
}