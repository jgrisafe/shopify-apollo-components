// @flow

import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

// eslint-disable-next-line
const { Provider, Consumer }: React.createContext<any> = React.createContext()

type State = {
  collection: ?Object,
  loading: boolean
}

export class CollectionProvider extends Component<any, State> {
  query = gql`
    {
      shop {
        collectionByHandle(handle: "main") {
          id
          description
          title
          handle
          products(first: 50) {
            edges {
              node {
                id
                handle
                images(first: 50) {
                  edges {
                    node {
                      originalSrc
                      transformedSrc
                      altText
                      id
                      transformedSrc
                    }
                  }
                }
              }
            }
          }
        }
      }
    } 
  `

  filterQuery = (shop: Object) => {
    const collection = shop.collectionByHandle
    const products = collection
      .products
      .edges
      .map(({ node }) => node)
    return Object.assign({}, collection, { products })
  }

  render() {
    return (
      <Query query={this.query}>
        {({ loading, data: { shop = {} } = {} }) => {
            if (loading || !shop.collectionByHandle) return null
            const collection = this.filterQuery(shop)
            return (
              <Provider value={{ loading, collection }}>
                {this.props.children}
              </Provider>
            )
          }}

      </Query>
    )
  }
}

export const CollectionConsumer = Consumer
