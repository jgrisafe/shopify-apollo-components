'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CollectionByHandle = require('./components/CollectionByHandle');

Object.defineProperty(exports, 'CollectionByHandle', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_CollectionByHandle).default;
  }
});

var _ProductByHandle = require('./components/ProductByHandle');

Object.defineProperty(exports, 'ProductByHandle', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ProductByHandle).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }