// @flow

import { getType, getTypeByName, getFullType } from './index'

function generateGraphqlQueryFields(fields: Object, innerSpacing: string = '') {
  return fields
    .filter(field => field)
    .map((field) => {
      const rootType = getTypeByName(getType(field.type)) || {}

      let key = field.name
      if (field.args && field.args.length) {
        key = `${field.name}(${field.args.map(arg => `$${arg.name}: ${getFullType(arg.type)}`)
          .join(',\n      ')})`
      }

      if (rootType.kind === 'OBJECT') {
        if (field.name === 'results') {
          return `${key} {
            ${generateGraphqlQueryFields(rootType.fields, `${innerSpacing}  `)}
          }`
        }

        return ''
      }

      return field.name
    })
    .join(`\n${innerSpacing}`)
}

export default generateGraphqlQueryFields
