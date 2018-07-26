
      // @flow

      import { Query } from 'react-apollo'
      import React from 'react'

      const query = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProductByHandleQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"handle"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shop"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productByHandle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"handle"},"value":{"kind":"Variable","name":{"kind":"Name","value":"handle"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"availableForSale"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"createdAt"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"description"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"descriptionHtml"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"handle"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"onlineStoreUrl"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"productType"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"tags"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"title"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"vendor"},"arguments":[],"directives":[]}]}}]}}]}}],"loc":{"start":0,"end":473}}

      type Props = {
        handle: string,
      }

      /**
       
    query ProductByHandleQuery(
      $handle: String!
    ) {
      shop {
        productByHandle(
          handle: $handle
        ) {
         availableForSale
         
         createdAt
         description
         descriptionHtml
         handle
         id
         
         onlineStoreUrl
         
         
         productType
         publishedAt
         tags
         title
         updatedAt
         
         
         vendor
      }
      }
    }
  
      */
      class ProductByHandle extends React.Component<Props> {
        static query = query

        render() {
          const { handle, ...others } = this.props

          return <Query query={query} variables={{ handle }} {...others} />
        }
      }

      export default ProductByHandle

    