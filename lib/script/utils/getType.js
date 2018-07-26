"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getType;
function getType(type) {
  if (type.ofType) return getType(type.ofType);

  return type.name;
}