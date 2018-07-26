"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createComponentName;
/** 
 * createComponentName
 * @param query
 * @return {string}
 */
function createComponentName(query) {
  return "" + query.name.charAt(0).toUpperCase() + query.name.substring(1);
}