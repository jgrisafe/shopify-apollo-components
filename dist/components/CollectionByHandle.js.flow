
      // @flow

      import { Query } from 'react-apollo'
      import React from 'react'

      const query = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CollectionByHandleQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"handle"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shop"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collectionByHandle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"handle"},"value":{"kind":"Variable","name":{"kind":"Name","value":"handle"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"descriptionHtml"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"handle"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"title"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"},"arguments":[],"directives":[]}]}}]}}]}}],"loc":{"start":0,"end":298}}

      type Props = {
        handle: string,
      }

      /**
       
    query CollectionByHandleQuery(
      $handle: String!
    ) {
      shop {
        collectionByHandle(
          handle: $handle
        ) {
         description
         descriptionHtml
         handle
         id
         
         
         title
         updatedAt
      }
      }
    }
  
      */
      class CollectionByHandle extends React.Component<Props> {
        static query = query

        render() {
          const { handle, ...others } = this.props

          return <Query query={query} variables={{ handle }} {...others} />
        }
      }

      export default CollectionByHandle

    