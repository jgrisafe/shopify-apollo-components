'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateComponentFile;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _graphqlTag = require('graphql-tag');

var _graphqlTag2 = _interopRequireDefault(_graphqlTag);

var _index = require('./index');

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generateComponentFile(rootQuery, query, outputDir) {
  var componentName = (0, _index.createComponentName)(query);
  var args = query.args.map(function (arg) {
    return arg.name;
  });
  var argList = args.join(', ');
  var queryString = (0, _index.createGraphqlQuery)(rootQuery, query, _constants.OPERATION_TYPES.QUERY);

  var filePath = _path2.default.join(outputDir, './components/' + componentName + '.js');
  var indexPath = _path2.default.join(outputDir, './index.js');
  var errorLogPath = _path2.default.join(outputDir, './error.log');

  var content = void 0;
  try {
    content = '\n      // @flow\n\n      import { Query } from \'react-apollo\'\n      import React from \'react\'\n\n      const query = ' + JSON.stringify((0, _graphqlTag2.default)(queryString)) + '\n\n      type Props = {\n        ' + (0, _index.generateFlowTypes)(query) + '\n      }\n\n      /**\n       ' + queryString + '\n      */\n      class ' + componentName + ' extends React.Component<Props> {\n        static query = query\n\n        render() {\n          const { ' + argList + ', ...others } = this.props\n\n          return <Query query={query} variables={{ ' + argList + ' }} {...others} />\n        }\n      }\n\n      export default ' + componentName + '\n\n    ';

    (0, _index.writeFile)(filePath, content);

    // append the component export to the index file so that apps that use the library can import components
    // like import { Organization } from '@classy/react-classyql'
    _fs2.default.appendFileSync(indexPath, 'export { default as ' + componentName + ' } from \'./components/' + componentName + '\'\n');
  } catch (err) {
    console.log('Couldn\'t generate component ' + componentName + ':', err.message); // eslint-disable-line no-console
    _fs2.default.appendFileSync(errorLogPath, 'Couldn\'t generate ' + componentName + ': ' + err.message + '\n');
  }
}