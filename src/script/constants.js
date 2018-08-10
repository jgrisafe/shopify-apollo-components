// @flow

import { data } from '../../graphql.schema.json'

// GraphQL operation types, not to be confused with the schema types below. These are the
// reserved words in graphQL which specify which type of operation you want to perform.
export const OPERATION_TYPES = {
  MUTATION: 'mutation',
  QUERY: 'query'
}

// =================================================================================================
// The export of schema.json is a graphql introspection in the form below, where the types array
// contains one type object with a name of "Query" where all of the of the base query objects are
// held, including arguments. In order to gather all of the data needed to reconstruct the query
// string, with all of the fields, we need to map the nested object inside the "Query" type with
// its respective type sitting at the same level as the "Query" object.
// {
//   "data": {
//   "__schema": {
//     "types": [
//       {
//         name: "Query",
//         fields: [
//           {
//             "name": "organization",
//             "args": [],
//             "type": {},
//             ...
//           }
//         ],
//         ...
//       },
//       {
//         name: "Organization",
//         fields: []
//       },
//       ...
//     ]
//   }
// }
// =================================================================================================
export const TYPES = data.__schema.types

export const GQL_TYPE_KINDS = {
  OBJECT: 'OBJECT',
  INPUT_OBJECT: 'INPUT_OBJECT',
  SCALAR: 'SCALAR',
  ENUM: 'ENUM',
  NON_NULL: 'NON_NULL',
  LIST: 'LIST',
  INTERFACE: 'INTERFACE',
  UNION: 'UNION'
}
