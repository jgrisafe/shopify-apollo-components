/** @flow
 * createComponentName
 * @param query
 * @return {string}
 */
export default function createComponentName(query: Object) {
  return `${query.name.charAt(0).toUpperCase()}${query.name.substring(1)}`
}
