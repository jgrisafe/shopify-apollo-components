'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = main;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _index = require('./utils/index');

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function main(outputDir) {
  // build the react-apollo query components from the fields inside the introspection 'Query' type
  var rootLevelTypes = _constants.TYPES.filter(function (_ref) {
    var name = _ref.name;
    return ['shop', 'customer'].includes(name.toLowerCase());
  });
  rootLevelTypes.forEach(function (rootType) {
    rootType.fields.forEach(function (query) {
      if (query.name === 'noop') return;

      var mappedType = (0, _index.mapQueryToType)(query, _constants.OPERATION_TYPES.QUERY);

      if (mappedType) (0, _index.generateComponentFile)(rootType.name.toLowerCase(), mappedType, outputDir);
    });
  });
}

// run the main script, which is only exported for testing purposes. Default is to write the components from the current
// directory, as this file will be ran in the correct location during the build process. However, during testing we
// change the location of the output files
/** 
 *
 * Main generator script
 *
 * Takes the classyql introspection result json data and generates files with apollo query component
 * wrappers (React Components). The generated components will be placed into lib/generated-code upon running
 * yarn generate. The generated components only work when the react application is wrapped with
 * the ReactClassyQLProvider.
 *
 * Resources:
 * 1) https://github.com/classy-org/classyql
 * 2) https://www.apollographql.com/docs/react/essentials/queries.html#basic
 * 3) https://graphql.org/learn/introspection/
 */
if (process.env.NODE_ENV === 'debug') main(_path2.default.join(__dirname, '../debug'));else if (!(process.env.NODE_ENV === 'test')) main(_path2.default.join(__dirname, '../'));