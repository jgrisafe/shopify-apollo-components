/** @flow
 *
 * getFullType
 * Get the full name of a type object, i.e. [Transaction]!, Organization!, etc
 * @param type
 */
export default function getFullType(type: Object) {
  const allTypes = []

  let current = type

  while (current.ofType) {
    allTypes.push({ kind: current.kind, name: current.name })
    current = current.ofType
  }

  const baseType = current

  let { name } = baseType

  allTypes.reverse().forEach(innerType => {
    if (innerType.kind === 'LIST') {
      name = `[${name}]`
    }

    if (innerType.kind === 'NON_NULL') {
      name = `${name}!`
    }
  })

  return name
}
