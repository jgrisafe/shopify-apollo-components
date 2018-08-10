// @flow

import { getInnerType, getTypeByName, getFullType } from './index'
import { GQL_TYPE_KINDS } from '../constants'

const argumentExtractor = (query) => {
  // build the initial argument object from the args array of the base query
  // this will be built upon with the arguments from the nested fields below
  const baseArgs = accumulateArgs(query.args)

  // loop through the fields and create a new args object for each field that requires
  // arguments. Most fields will not have any arguments.
  const baseFieldArgs = getTypeByName(query.type.name).fields.reduce((accum, field) => {
    if (field.args && field.args.length) {
      // console.log(getTypeByName(field.type.name)) // eslint-disable-line no-console
      return Object.assign(accum, { [field.name]: accumulateArgs(field.args) })
    }
    return accum
  }, {})

  return { ...baseArgs, ...baseFieldArgs }
}

export default argumentExtractor

function accumulateArgs(args) {
  if (!args) return null
  return args.reduce((accum, arg) => {
    const innerType = getInnerType(arg.type)
    const type = getTypeByName(innerType.name)
    if (type.fields) {
      console.log(type.name, type.fields) // eslint-disable-line no-console
    }
    switch (type.kind) {
      case GQL_TYPE_KINDS.INPUT_OBJECT: {
        return Object.assign(accum, { [type.name]: accumulateArgs(type.inputFields) })
      }

      case GQL_TYPE_KINDS.ENUM: {
        return Object.assign(accum, { [type.name]: type.enumValues.map(value => value.name).join(' | ') })
      }

      default: {
        return Object.assign(accum, { [arg.name]: getFullType(type) })
      }
    }
  },
  {})
}
