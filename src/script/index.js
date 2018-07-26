/** @flow
 *
 * Main generator script
 *
 * Takes the classyql introspection result json data and generates files with apollo query component
 * wrappers (React Components). The generated components will be placed into lib/generated-code upon running
 * yarn generate. The generated components only work when the react application is wrapped with
 * the ReactClassyQLProvider.
 *
 * Resources:
 * 1) https://github.com/classy-org/classyql
 * 2) https://www.apollographql.com/docs/react/essentials/queries.html#basic
 * 3) https://graphql.org/learn/introspection/
 */
import path from 'path'
import { generateComponentFile, generateMutationFile, mapQueryToType } from './utils/index'
import { TYPES, OPERATION_TYPES } from './constants'

export default function main(outputDir: string) {
  // build the react-apollo mutation functions from the fields inside the introspection 'Mutation' type
  // const mutationObject = TYPES.find(type => type.name === 'Mutation')
  // mutationObject.fields.forEach((query) => {
  //   if (query.name === 'noop') return
  //
  //   const mappedType = mapQueryToType(query, OPERATION_TYPES.MUTATION)
  //
  //   if (mappedType) generateMutationFile(mappedType, outputDir)
  // })

  // build the react-apollo query components from the fields inside the introspection 'Query' type
  const queryObject = TYPES.find(type => type.name === 'Shop')
  if (queryObject) {
    queryObject.fields.forEach((query) => {
      if (query.name === 'noop') return

      const mappedType = mapQueryToType(query, OPERATION_TYPES.QUERY)

      if (mappedType) generateComponentFile(mappedType, outputDir)
    })
  }
}

// run the main script, which is only exported for testing purposes. Default is to write the components from the current
// directory, as this file will be ran in the correct location during the build process. However, during testing we
// change the location of the output files
if (process.env.NODE_ENV === 'debug') main(path.join(__dirname, '../debug'))
else if (!(process.env.NODE_ENV === 'test')) main(path.join(__dirname, '../'))
