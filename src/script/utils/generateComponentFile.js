// @flow

import fs from 'fs'
import path from 'path'
import gql from 'graphql-tag'

import {
  createComponentName,
  writeFile,
  createGraphqlQuery,
  generateFlowTypes,
  getFullType,
  buildArgsObject
} from './index'

import { OPERATION_TYPES } from '../constants'

import type { Query } from '../flow-types/index'

export default function generateComponentFile(rootQuery, query: Query, outputDir: string) {
  const componentName = createComponentName(query)
  const args = query.args.map(arg => arg.name)
  const argList = args.join(', ')

  const argObject = buildArgsObject()(query)

  const queryString = createGraphqlQuery(rootQuery, query, OPERATION_TYPES.QUERY)

  const filePath = path.join(outputDir, `./components/${componentName}.js`)
  const indexPath = path.join(outputDir, './index.js')
  const errorLogPath = path.join(outputDir, './error.log')

  let content
  try {
    content = `
      // @flow

      import { Query } from 'react-apollo'
      import React from 'react'

      const query = ${JSON.stringify(gql(queryString))}

      type Props = {
        ${generateFlowTypes(query)}
      }

      /**
       ${queryString}
      */
      class ${componentName} extends React.Component<Props> {
        static query = query

        render() {
          const { ${argList}, ...others } = this.props

          return <Query query={query} variables={{ ${argList} }} {...others} />
        }
      }

      export default ${componentName}

    `

    writeFile(filePath, content)

    // append the component export to the index file so that apps that use the library
    // can import components
    fs.appendFileSync(
      indexPath,
      `export { default as ${componentName} } from './components/${componentName}'\n`
    )
  } catch (err) {
    console.log(`Couldn't generate component ${componentName}:`, err.message) // eslint-disable-line no-console
    if (process.env.NODE_ENV !== 'debug') {
      fs.appendFileSync(errorLogPath, `Couldn't generate ${componentName}: ${err.message}\n`)
    }
  }
}

