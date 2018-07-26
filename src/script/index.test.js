// @flow
import React from 'react'
import path from 'path'
import { render, wait } from 'react-testing-library'

import main from './index'

const tempPath = path.join(__dirname, './temp/')
const rootPath = path.join(__dirname, '../')
const srcPath = path.join(__dirname, '../src')

afterAll(() => {
  // clean up the temp files after the tests are through
  // eslint-disable-next-line
  require('child_process').execSync(`rm -rf ${path.join(__dirname, 'temp')}`)
})

beforeAll(() => {
  // we need to copy the contents over so the test modules have the resources they need to run in production
  // unfortunatly mocking components that are referenced by a generated file is difficult
  // eslint-disable-next-line
  require('child_process').execSync(
    `BABEL_ENV=es5 babel ${rootPath} --ignore ${srcPath} -d ${tempPath}`
  )

  // execute the main script to generate the components and mutations outlined in the mock
  // schema below.
  main(tempPath)
})

jest.mock('@classy/classyql/schema.json', () => mockSchema())
jest.mock('react-apollo', () => ({ Query: ({ children }) => children }))

describe('The main script', () => {
  it('should render a generated component', () => {
    // flow-disable-next-line
    const Organization = require('./temp/components/Organization').default // eslint-disable-line

    const renderableFunction = makeRenderable((a, b) => a + b, () => <div>test</div>)

    let result

    expect(() => {
      result = render(<Organization>{renderableFunction()}</Organization>)
    }).not.toThrowError()

    expect(wait(() => result.getByText('test'))).toBeDefined()
  })

  it('should export a generated mutation', () => {
    // flow-disable-next-line
    const updateOrganization = require('./temp/mutations/updateOrganization').default // eslint-disable-line

    expect(updateOrganization).toBeDefined()
  })
})

// makes it so testing a render function does not throw warnings, see link below for full blog post
// https://kentcdodds.com/post/rendering-a-function-with-react/
function makeRenderable(fn, valueGetter) {
  const ITERATOR_SYMBOL = (typeof Symbol === 'function' && Symbol.iterator) || '@@iterator'
  function iterator() {
    let timesCalled = 0
    return {
      next() {
        timesCalled += 1
        const done = timesCalled > 0
        return { done, value: done ? undefined : valueGetter() }
      }
    }
  }
  // eslint-disable-next-line
  fn[ITERATOR_SYMBOL] = iterator
  return fn
}

// mock the introspection schema
function mockSchema() {
  return {
    data: {
      __schema: {
        types: [
          {
            name: 'Query',
            fields: [
              {
                name: 'organization',
                args: [
                  {
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
                  }
                ],
                type: {
                  kind: 'NON_NULL',
                  name: null,
                  ofType: {
                    kind: 'OBJECT',
                    name: 'Organization',
                    ofType: null
                  }
                }
              }
            ]
          },
          {
            name: 'Mutation',
            fields: [
              {
                name: 'updateOrganization',
                description: '',
                args: [
                  {
                    name: 'id',
                    description: '',
                    type: {
                      kind: 'NON_NULL',
                      name: null,
                      ofType: { kind: 'SCALAR', name: 'ID', ofType: null }
                    },
                    defaultValue: null
                  },
                  {
                    name: 'input',
                    description: '',
                    type: {
                      kind: 'NON_NULL',
                      name: null,
                      ofType: { kind: 'INPUT_OBJECT', name: 'OrganizationUpdate', ofType: null }
                    },
                    defaultValue: null
                  }
                ],
                type: {
                  kind: 'NON_NULL',
                  name: null,
                  ofType: { kind: 'OBJECT', name: 'Organization', ofType: null }
                },
                isDeprecated: false,
                deprecationReason: null
              }
            ]
          },
          {
            kind: 'OBJECT',
            name: 'Organization',
            description: '',
            fields: [
              {
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
              },
              {
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
              }
            ],
            inputFields: null,
            interfaces: [],
            enumValues: null,
            possibleTypes: null
          },
          {
            kind: 'SCALAR',
            name: 'City'
          },
          {
            kind: 'SCALAR',
            name: 'Address'
          },
          {
            kind: 'INPUT_OBJECT',
            name: 'OrganizationUpdate',
            description: '',
            fields: null,
            inputFields: [
              {
                name: 'address',
                description: '',
                type: { kind: 'SCALAR', name: 'String', ofType: null },
                defaultValue: null
              },
              {
                name: 'city',
                description: '',
                type: { kind: 'SCALAR', name: 'String', ofType: null },
                defaultValue: null
              }
            ],
            interfaces: null,
            enumValues: null,
            possibleTypes: null
          }
        ]
      }
    }
  }
}
