// @flow

import { getType, getTypeByName } from './index'
import type { OperationType } from '../flow-types/index'

/**
 * mapQueryToType
 *
 * Maps a graphql query definition to it's eligible fields, and removed some frivolous attributes from the
 * two merged objects, returning only the essential information needed to contruct an entire graphql query
 *
 * @param query - the current query object to be mapped to it's fields within the types array
 * @param getRootType - flag to set when you want to retrieve the query's return type
 * @return {{args: *, name: *, fields: *, operationType: string}}
 */
export default function(query: any, operationType: OperationType) {
  const mappedTypeName = getType(query.type)
  const type = getTypeByName(mappedTypeName)
  if (type) {
    return {
      operationType,
      args: query.args,
      name: query.name,
      fields: type.fields
    }
  }
  return null
}
