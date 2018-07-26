// @flow

export default function getType(type: Object) {
  if (type.ofType) return getType(type.ofType)

  return type.name
}
