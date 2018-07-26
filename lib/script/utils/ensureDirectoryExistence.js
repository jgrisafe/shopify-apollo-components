'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ensureDirectoryExistence;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** 
 *
 * ensureDirectoryExistence
 * @param filePath
 */
function ensureDirectoryExistence(filePath) {
  var dirname = _path2.default.dirname(filePath);

  if (_fs2.default.existsSync(dirname)) {
    return;
  }

  ensureDirectoryExistence(dirname);
  _fs2.default.mkdirSync(dirname);
}