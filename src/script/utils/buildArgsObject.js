// @flow

import { getFullType } from './index'

const argumentExtractor = () => {
  const argsObject = {}

  return function extract(query, fieldNameArray) {
    if (!(query && query.args && query.args.length)) {
      return
    }

    query.args.forEach((arg) => {
      if (fieldNameArray && fieldNameArray.length) {
        return setDeep(argsObject)(fieldNameArray, getFullType(arg.type))
      }
      argsObject[arg.name] = getFullType(arg.type)
    })

    if (query.fields) {
      query.fields.forEach((field) => {
        extract(field, [...(fieldNameArray || []), field.name])
      })
    }

    return argsObject
  }
}

export default argumentExtractor()

function setDeep(obj = {}) {
  return function set(pathArray, value) {
    let schema = obj
    const len = pathArray.length
    for (let i = 0; i < len - 1; i += 1) {
      const elem = pathArray[i]
      if (!schema[elem]) schema[elem] = {}
      schema = schema[elem]
    }

    schema[pathArray[len - 1]] = value
  }
}
