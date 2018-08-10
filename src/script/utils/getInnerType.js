// @flow

export default function getRootType(type: Object) {
  if (type.ofType) return getRootType(type.ofType)
  return type
}
