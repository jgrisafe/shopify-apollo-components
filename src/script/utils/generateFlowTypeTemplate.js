// @flow

import { GQL_TYPE_KINDS } from '../constants'
import { getType, getTypeByName, getFullType } from './index'

const CACHED_TYPES = {}

export default function generateFlowTypeTemplate(mainType: Object) {
  if (mainType.kind === GQL_TYPE_KINDS.SCALAR) {
    return mapScalarTypes(mainType)
  }

  if (mainType.kind === GQL_TYPE_KINDS.INPUT_OBJECT && mainType.inputFields) {
    return `{
          ${mainType.inputFields
            .map(({ name, type }) => {
              const rootTypeName = getType(type)
              CACHED_TYPES[rootTypeName] = CACHED_TYPES[rootTypeName] || getTypeByName(rootTypeName)
              return {
                name,
                fieldType: CACHED_TYPES[rootTypeName],
                typeDefinition: getFullType(type)
              }
            })
            .map(({ name, fieldType, typeDefinition }) => {
              const flowPrimitive = mapGraphqlTypeToFlowType(fieldType)
              const flowKey = `${name}${typeDefinition.endsWith('!') ? '' : '?'}`
              return `${flowKey}: ${flowPrimitive}`
            })
            .join(',\n          ')}
        }`
  }

  return mapGraphqlTypeToFlowType(mainType)
}

function mapGraphqlTypeToFlowType(type: Object) {
  const { kind } = type || {}
  switch (kind) {
    case GQL_TYPE_KINDS.SCALAR:
      return mapScalarTypes(type)
    case GQL_TYPE_KINDS.ENUM:
      return generateEnumTypeString(type)

    // all types should be scalar or enum at this point, but we return any just to be safe and
    // cover our asses
    default: {
      return 'any'
    }
  }
}

function mapScalarTypes(type) {
  switch (type.name) {
    case 'Int':
    case 'Float':
      return 'number'
    case 'String':
    case 'DateTime':
      return 'string'
    case 'ID':
      return 'string | number'
    case 'Boolean':
      return 'boolean'
    default:
      return 'any'
  }
}

function generateEnumTypeString({ enumValues }) {
  return enumValues ? enumValues.map(val => `'${val.name}'`).join(' | ') : 'any'
}
