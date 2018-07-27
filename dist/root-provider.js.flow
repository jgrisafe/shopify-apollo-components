'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _apolloClient = require('apollo-client');

var _apolloLinkHttp = require('apollo-link-http');

var _apolloLinkContext = require('apollo-link-context');

var _apolloCacheInmemory = require('apollo-cache-inmemory');

var _reactApollo = require('react-apollo');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var creatClient = function creatClient(uri, accessToken) {
  var middlewareLink = (0, _apolloLinkContext.setContext)(function () {
    return {
      headers: { 'X-Shopify-Storefront-Access-Token': accessToken }
    };
  });

  var httpLink = (0, _apolloLinkHttp.createHttpLink)({ uri: uri });

  return new _apolloClient.ApolloClient({
    link: middlewareLink.concat(httpLink),
    cache: new _apolloCacheInmemory.InMemoryCache()
  });
};

var RootProvider = function RootProvider(_ref) {
  var accessToken = _ref.accessToken,
      uri = _ref.uri,
      children = _ref.children;
  return _react2.default.createElement(
    _reactApollo.ApolloProvider,
    { client: creatClient(uri, accessToken) },
    children
  );
};

exports.default = RootProvider;