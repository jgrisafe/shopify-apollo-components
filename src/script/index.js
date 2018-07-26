/** @flow
 *
 * Main generator script
 *
 * Takes the shopify graphql introspection result json data and generates files with apollo query component
 * wrappers (React Components). The generated components will be placed into the lib dir upon running
 * yarn generate. The generated components only work when the react application is wrapped with
 * an ApolloProvider (see examples/shared/root-provider.js).
 *
 * Resources:
 * 1) https://www.apollographql.com/docs/react/essentials/queries.html#basic
 * 2) https://graphql.org/learn/introspection/
 */
import path from 'path'
import { generateComponentFile, generateMutationFile, mapQueryToType } from './utils/index'
import { TYPES, OPERATION_TYPES } from './constants'

export default function main(outputDir: string) {
  const rootLevelTypes = TYPES.filter(({ name }) => ['shop', 'customer'].includes(name.toLowerCase()))
  rootLevelTypes.forEach((rootType) => {
    rootType.fields.forEach((query) => {
      if (query.name === 'noop') return

      const mappedType = mapQueryToType(query, OPERATION_TYPES.QUERY)

      if (mappedType) generateComponentFile(rootType.name.toLowerCase(), mappedType, outputDir)
    })
  })
}

// run the main script, which is only exported for testing purposes. Default is to write the components from the current
// directory, as this file will be ran in the correct location during the build process. However, during testing we
// change the location of the output files
if (process.env.NODE_ENV === 'debug') main(path.join(__dirname, '../debug'))
else if (!(process.env.NODE_ENV === 'test')) main(path.join(__dirname, '../'))
