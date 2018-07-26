// @flow

import { getType, getTypeByName } from './index'

function generateGraphqlQueryFields(fields: Object, innerSpacing: string = '') {
  return fields
    .filter(field => field)
    .map(field => {
      const rootType = getTypeByName(getType(field.type)) || {}

      if (rootType.kind === 'OBJECT') {
        if (field.name === 'results') {
          return `${field.name} {
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
