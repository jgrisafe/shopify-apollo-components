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

var query = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "CollectionByHandleQuery" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "handle" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "shop" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "collectionByHandle" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "handle" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "handle" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "description" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "descriptionHtml" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "handle" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "id" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "title" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "updatedAt" }, "arguments": [], "directives": [] }] } }] } }] } }], "loc": { "start": 0, "end": 298 } };

/**
 
query CollectionByHandleQuery(
$handle: String!
) {
shop {
  collectionByHandle(
    handle: $handle
  ) {
   description
   descriptionHtml
   handle
   id
   
   
   title
   updatedAt
}
}
}
   */
var CollectionByHandle = function (_React$Component) {
  _inherits(CollectionByHandle, _React$Component);

  function CollectionByHandle() {
    _classCallCheck(this, CollectionByHandle);

    return _possibleConstructorReturn(this, (CollectionByHandle.__proto__ || Object.getPrototypeOf(CollectionByHandle)).apply(this, arguments));
  }

  _createClass(CollectionByHandle, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          handle = _props.handle,
          others = _objectWithoutProperties(_props, ['handle']);

      return _react2.default.createElement(_reactApollo.Query, _extends({ query: query, variables: { handle: handle } }, others));
    }
  }]);

  return CollectionByHandle;
}(_react2.default.Component);

CollectionByHandle.query = query;
exports.default = CollectionByHandle;