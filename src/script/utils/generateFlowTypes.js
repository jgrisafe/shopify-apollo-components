// @flow

import { getInnerType, getTypeByName, generateFlowTypeTemplate, getFullType } from './index'

import type { Query } from '../flow-types/index'
import { GQL_TYPE_KINDS } from '../constants'

export default function generateFlowTypes({ args }: Query) {
  return args
    .map(({ name, type }) => ({
      name,
      type: getTypeByName(getInnerType(type).name) || type,
      typeDefinition: getFullType(type)
    }))
    .filter(({ name, type }) => name && type)
    .sort(sortInputFields)
    .map(({ name, type, typeDefinition }) => {
      const flowKey = `${name}${typeDefinition.endsWith('!') ? '' : '?'}`
      return `${flowKey}: ${generateFlowTypeTemplate(type)},`
    })
    .join('\n        ')
}

function sortInputFields(field) {
  if (field.type.kind !== GQL_TYPE_KINDS.INPUT_OBJECT) return -1
  return 1
}
