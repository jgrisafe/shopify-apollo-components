'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('./index');

function generateGraphqlQueryFields(fields) {
  var innerSpacing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  return fields.filter(function (field) {
    return field;
  }).map(function (field) {
    var rootType = (0, _index.getTypeByName)((0, _index.getType)(field.type)) || {};

    var key = field.name;
    if (field.args && field.args.length) {
      key = field.name + '(' + field.args.map(function (arg) {
        return '$' + arg.name + ': ' + (0, _index.getFullType)(arg.type);
      }).join(',\n      ') + ')';
    }

    if (rootType.kind === 'OBJECT') {
      if (field.name === 'results') {
        return key + ' {\n            ' + generateGraphqlQueryFields(rootType.fields, innerSpacing + '  ') + '\n          }';
      }

      return '';
    }

    return field.name;
  }).join('\n' + innerSpacing);
}

exports.default = generateGraphqlQueryFields;