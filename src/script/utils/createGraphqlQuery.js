// @flow

import { createComponentName, getFullType, generateGraphqlQueryFields } from './index'

import type { Query, OperationType } from '../flow-types/index'

export default function(query: Query, type: OperationType) {
  const componentName = createComponentName(query)
  return `
    ${type} ${componentName}${type.charAt(0).toUpperCase() + type.slice(1)}(
      ${query.args.map(arg => `$${arg.name}: ${getFullType(arg.type)}`).join(',\n      ')}
    ) {
      ${query.name}(
        ${query.args.map(arg => `${arg.name}: $${arg.name}`).join(',\n        ')}
      ) ${generateFields(query.fields)}
    }
  `
}

function generateFields(fields) {
  if (!fields) return ''
  return `{
         ${generateGraphqlQueryFields(fields, '         ')}
      }`
}
