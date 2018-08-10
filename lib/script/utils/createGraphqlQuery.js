'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (rootQuery, query, type) {
  var componentName = (0, _index.createComponentName)(query);
  var args = (0, _index.buildArgsObject)(query);
  console.log(args); // eslint-disable-line no-console
  return '\n    ' + type + ' ' + componentName + (type.charAt(0).toUpperCase() + type.slice(1)) + '(\n      ' + query.args.map(function (arg) {
    return '$' + arg.name + ': ' + (0, _index.getFullType)(arg.type);
  }).join(',\n      ') + '\n    ) {\n      ' + rootQuery + ' {\n        ' + query.name + '(\n          ' + query.args.map(function (arg) {
    return arg.name + ': $' + arg.name;
  }).join(',\n        ') + '\n        ) ' + generateFields(query.fields) + '\n      }\n    }\n  ';
};

var _index = require('./index');

function generateFields(fields) {
  if (!fields) return '';
  return '{\n         ' + (0, _index.generateGraphqlQueryFields)(fields, '         ') + '\n      }';
}