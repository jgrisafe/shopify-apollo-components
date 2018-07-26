'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = writeFile;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ensureDirectoryExistence = require('./ensureDirectoryExistence');

var _ensureDirectoryExistence2 = _interopRequireDefault(_ensureDirectoryExistence);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * writeFile
 * @param filePath
 * @param content
 */
function writeFile(filePath, content) {
  (0, _ensureDirectoryExistence2.default)(filePath);
  _fs2.default.writeFileSync(filePath, content);
}