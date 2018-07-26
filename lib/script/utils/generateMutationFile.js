'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (mutation, outputDir) {
  var mutationName = (0, _index.createComponentName)(mutation);
  var mutationString = (0, _index.createGraphqlQuery)(mutation, _constants.OPERATION_TYPES.MUTATION);
  var filePath = _path2.default.join(outputDir, './mutations/' + mutation.name + '.js');
  var indexPath = _path2.default.join(outputDir, './index.js');
  var errorLogPath = _path2.default.join(outputDir, './error.log');
  var content = void 0;
  try {
    content = '\n      // @flow\n\n      import { getClient } from \'../ReactClassyQLProvider\'\n\n      const mutation = ' + JSON.stringify((0, _graphqlTag2.default)(mutationString)) + '\n\n      type Variables = {\n        ' + (0, _index.generateFlowTypes)(mutation) + '\n      }\n\n      /**\n       ' + mutationString + '\n      */\n      function ' + mutation.name + '(variables: Variables) {\n        return getClient().mutate({ mutation, variables })\n      }\n\n      export default ' + mutation.name + '\n\n    ';

    (0, _index.writeFile)(filePath, content);

    // append the component export to the index file so that apps that use the library can import components
    // like import { Organization } from '@classy/react-classyql'
    _fs2.default.appendFileSync(indexPath, 'export { default as ' + mutation.name + ' } from \'./mutations/' + mutation.name + '\'\n');
  } catch (err) {
    console.log('Couldn\'t generate mutation ' + mutationName + ':', err.message); // eslint-disable-line no-console
    _fs2.default.appendFileSync(errorLogPath, 'Couldn\'t generate ' + mutationName + ': ' + err.message + '\n');
  }
};

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _graphqlTag = require('graphql-tag');

var _graphqlTag2 = _interopRequireDefault(_graphqlTag);

var _index = require('./index');

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }