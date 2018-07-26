'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _reactTestingLibrary = require('react-testing-library');

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tempPath = _path2.default.join(__dirname, './temp/');
var rootPath = _path2.default.join(__dirname, '../');
var srcPath = _path2.default.join(__dirname, '../src');

afterAll(function () {
  // clean up the temp files after the tests are through
  // eslint-disable-next-line
  require('child_process').execSync('rm -rf ' + _path2.default.join(__dirname, 'temp'));
});

beforeAll(function () {
  // we need to copy the contents over so the test modules have the resources they need to run in production
  // unfortunatly mocking components that are referenced by a generated file is difficult
  // eslint-disable-next-line
  require('child_process').execSync('BABEL_ENV=es5 babel ' + rootPath + ' --ignore ' + srcPath + ' -d ' + tempPath);

  // execute the main script to generate the components and mutations outlined in the mock
  // schema below.
  (0, _index2.default)(tempPath);
});

jest.mock('@classy/classyql/schema.json', function () {
  return mockSchema();
});
jest.mock('react-apollo', function () {
  return { Query: function Query(_ref) {
      var children = _ref.children;
      return children;
    } };
});

describe('The main script', function () {
  it('should render a generated component', function () {
    // flow-disable-next-line
    var Organization = require('./temp/components/Organization').default; // eslint-disable-line

    var renderableFunction = makeRenderable(function (a, b) {
      return a + b;
    }, function () {
      return _react2.default.createElement(
        'div',
        null,
        'test'
      );
    });

    var result = void 0;

    expect(function () {
      result = (0, _reactTestingLibrary.render)(_react2.default.createElement(
        Organization,
        null,
        renderableFunction()
      ));
    }).not.toThrowError();

    expect((0, _reactTestingLibrary.wait)(function () {
      return result.getByText('test');
    })).toBeDefined();
  });

  it('should export a generated mutation', function () {
    // flow-disable-next-line
    var updateOrganization = require('./temp/mutations/updateOrganization').default; // eslint-disable-line

    expect(updateOrganization).toBeDefined();
  });
});

// makes it so testing a render function does not throw warnings, see link below for full blog post
// https://kentcdodds.com/post/rendering-a-function-with-react/
function makeRenderable(fn, valueGetter) {
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator || '@@iterator';
  function iterator() {
    var timesCalled = 0;
    return {
      next: function next() {
        timesCalled += 1;
        var done = timesCalled > 0;
        return { done: done, value: done ? undefined : valueGetter() };
      }
    };
  }
  // eslint-disable-next-line
  fn[ITERATOR_SYMBOL] = iterator;
  return fn;
}

// mock the introspection schema
function mockSchema() {
  return {
    data: {
      __schema: {
        types: [{
          name: 'Query',
          fields: [{
            name: 'organization',
            args: [{
              name: 'id',
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'SCALAR',
                  name: 'ID',
                  ofType: null
                }
              }
            }],
            type: {
              kind: 'NON_NULL',
              name: null,
              ofType: {
                kind: 'OBJECT',
                name: 'Organization',
                ofType: null
              }
            }
          }]
        }, {
          name: 'Mutation',
          fields: [{
            name: 'updateOrganization',
            description: '',
            args: [{
              name: 'id',
              description: '',
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: { kind: 'SCALAR', name: 'ID', ofType: null }
              },
              defaultValue: null
            }, {
              name: 'input',
              description: '',
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: { kind: 'INPUT_OBJECT', name: 'OrganizationUpdate', ofType: null }
              },
              defaultValue: null
            }],
            type: {
              kind: 'NON_NULL',
              name: null,
              ofType: { kind: 'OBJECT', name: 'Organization', ofType: null }
            },
            isDeprecated: false,
            deprecationReason: null
          }]
        }, {
          kind: 'OBJECT',
          name: 'Organization',
          description: '',
          fields: [{
            name: 'address',
            type: {
              kind: 'NON_NULL',
              name: null,
              ofType: {
                kind: 'SCALAR',
                name: 'Address',
                ofType: null
              }
            }
          }, {
            name: 'city',
            type: {
              kind: 'NON_NULL',
              name: null,
              ofType: {
                kind: 'SCALAR',
                name: 'City',
                ofType: null
              }
            }
          }],
          inputFields: null,
          interfaces: [],
          enumValues: null,
          possibleTypes: null
        }, {
          kind: 'SCALAR',
          name: 'City'
        }, {
          kind: 'SCALAR',
          name: 'Address'
        }, {
          kind: 'INPUT_OBJECT',
          name: 'OrganizationUpdate',
          description: '',
          fields: null,
          inputFields: [{
            name: 'address',
            description: '',
            type: { kind: 'SCALAR', name: 'String', ofType: null },
            defaultValue: null
          }, {
            name: 'city',
            description: '',
            type: { kind: 'SCALAR', name: 'String', ofType: null },
            defaultValue: null
          }],
          interfaces: null,
          enumValues: null,
          possibleTypes: null
        }]
      }
    }
  };
}