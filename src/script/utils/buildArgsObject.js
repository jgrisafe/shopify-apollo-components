// @flow

import { getType, getTypeByName } from './index'

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
  return args.reduce((accum, arg) => (
    Object.assign(accum, { [arg.name]: getType(arg.type) })),
  {})
}
