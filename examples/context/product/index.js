// @flow

import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

// eslint-disable-next-line
const { Provider, Consumer }: React.createContext<any> = React.createContext()

const query = ({ handle }) => gql`
{
  shop {
    productByHandle(handle: ${handle}) {
      availableForSale
      createdAt
      description
      descriptionHtml
      handle
      id
      onlineStoreUrl
      options {
        id
        name
        values
      }
      priceRange {
        maxVariantPrice {
          amount
          currencyCode
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
      productType
      publishedAt
      tags
      title
      updatedAt
      # variantBySelectedOptions
      vendor
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
`

export const ProductProvider = ({ handle, children }: { handle: string, children: Object }) => (
  <Query query={query({ handle })}>
    {({ loading: productDataLoading, data: { shop = {} } = {} }) => {
      console.log(handle) // eslint-disable-line no-console
      const loading = productDataLoading || !shop.productByHandle
      const product = loading ? null : shop.productByHandle
      return (
        <Provider value={{ loading, product }}>
          {children}
        </Provider>
      )
    }}
  </Query>
)

export const ProductConsumer = Consumer
