// @flow

import fs from 'fs'
import path from 'path'
import gql from 'graphql-tag'

import { createComponentName, createGraphqlQuery, generateFlowTypes, writeFile } from './index'
import { OPERATION_TYPES } from '../constants'
import type { Query } from '../flow-types/index'

export default function(mutation: Query, outputDir: string) {
  const mutationName = createComponentName(mutation)
  const mutationString = createGraphqlQuery(mutation, OPERATION_TYPES.MUTATION)
  const filePath = path.join(outputDir, `./mutations/${mutation.name}.js`)
  const indexPath = path.join(outputDir, './index.js')
  const errorLogPath = path.join(outputDir, './error.log')
  let content
  try {
    content = `
      // @flow

      import { getClient } from '../ReactClassyQLProvider'

      const mutation = ${JSON.stringify(gql(mutationString))}

      type Variables = {
        ${generateFlowTypes(mutation)}
      }

      /**
       ${mutationString}
      */
      function ${mutation.name}(variables: Variables) {
        return getClient().mutate({ mutation, variables })
      }

      export default ${mutation.name}

    `

    writeFile(filePath, content)

    // append the component export to the index file so that apps that use the library can import components
    // like import { Organization } from '@classy/react-classyql'
    fs.appendFileSync(
      indexPath,
      `export { default as ${mutation.name} } from './mutations/${mutation.name}'\n`
    )
  } catch (err) {
    console.log(`Couldn't generate mutation ${mutationName}:`, err.message) // eslint-disable-line no-console
    fs.appendFileSync(errorLogPath, `Couldn't generate ${mutationName}: ${err.message}\n`)
  }
}
