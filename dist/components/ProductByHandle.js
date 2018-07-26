'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactApollo = require('react-apollo');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var query = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "ProductByHandleQuery" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "handle" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "shop" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "productByHandle" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "handle" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "handle" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "availableForSale" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "createdAt" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "description" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "descriptionHtml" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "handle" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "id" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "onlineStoreUrl" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "productType" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "publishedAt" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "tags" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "title" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "updatedAt" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "vendor" }, "arguments": [], "directives": [] }] } }] } }] } }], "loc": { "start": 0, "end": 473 } };

/**
 
query ProductByHandleQuery(
$handle: String!
) {
shop {
  productByHandle(
    handle: $handle
  ) {
   availableForSale
   
   createdAt
   description
   descriptionHtml
   handle
   id
   
   onlineStoreUrl
   
   
   productType
   publishedAt
   tags
   title
   updatedAt
   
   
   vendor
}
}
}
   */
var ProductByHandle = function (_React$Component) {
  _inherits(ProductByHandle, _React$Component);

  function ProductByHandle() {
    _classCallCheck(this, ProductByHandle);

    return _possibleConstructorReturn(this, (ProductByHandle.__proto__ || Object.getPrototypeOf(ProductByHandle)).apply(this, arguments));
  }

  _createClass(ProductByHandle, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          handle = _props.handle,
          others = _objectWithoutProperties(_props, ['handle']);

      return _react2.default.createElement(_reactApollo.Query, _extends({ query: query, variables: { handle: handle } }, others));
    }
  }]);

  return ProductByHandle;
}(_react2.default.Component);

ProductByHandle.query = query;
exports.default = ProductByHandle;