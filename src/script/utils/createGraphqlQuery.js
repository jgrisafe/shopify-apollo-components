// @flow

import {
  createComponentName,
  getFullType,
  generateGraphqlQueryFields,
  buildArgsObject
} from './index'

import type { Query, OperationType } from '../flow-types/index'

export default function (rootQuery, query: Query, type: OperationType) {
  const componentName = createComponentName(query)
  const args = buildArgsObject(query)
  console.log(args) // eslint-disable-line no-console
  return `
    ${type} ${componentName}${type.charAt(0).toUpperCase() + type.slice(1)}(
      ${query.args.map(arg => `$${arg.name}: ${getFullType(arg.type)}`).join(',\n      ')}
    ) {
      ${rootQuery} {
        ${query.name}(
          ${query.args.map(arg => `${arg.name}: $${arg.name}`).join(',\n        ')}
        ) ${generateFields(query.fields)}
      }
    }
  `
}

function generateFields(fields) {
  if (!fields) return ''
  return `{
         ${generateGraphqlQueryFields(fields, '         ')}
      }`
}
