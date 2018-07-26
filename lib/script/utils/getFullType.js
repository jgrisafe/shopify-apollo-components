'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getFullType;
/** 
 *
 * getFullType
 * Get the full name of a type object, i.e. [Transaction]!, Organization!, etc
 * @param type
 */
function getFullType(type) {
  var allTypes = [];

  var current = type;

  while (current.ofType) {
    allTypes.push({ kind: current.kind, name: current.name });
    current = current.ofType;
  }

  var baseType = current;

  var name = baseType.name;


  allTypes.reverse().forEach(function (innerType) {
    if (innerType.kind === 'LIST') {
      name = '[' + name + ']';
    }

    if (innerType.kind === 'NON_NULL') {
      name = name + '!';
    }
  });

  return name;
}