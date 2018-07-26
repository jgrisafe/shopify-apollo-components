// @flow

import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

// eslint-disable-next-line
const { Provider, Consumer }: React.createContext<any> = React.createContext()

const query = ({ handle, productCount = 50 }: { handle: string, productCount?: number}) => gql`
{
  shop {
    collectionByHandle(handle: "${handle}") {
      id
      description
      descriptionHtml
      image {
        originalSrc
        transformedSrc
      }
      title
      handle
      updatedAt
      products(first: ${productCount}) {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        edges {
          cursor
          node {
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
    }
  }
} 
`

const filterQueryData = (shop: Object) => {
  const collection = shop.collectionByHandle

  const products = collection
    .products
    .edges
    .map(({ node }) => node)

  const { pageInfo } = collection.products

  return Object.assign({}, collection, { products }, pageInfo)
}

export const CollectionProvider = ({ handle, children }: { handle: string, children: Object }) => (
  <Query query={query({ handle })}>
    {({ loading: collectionDataLoading, data: { shop = {} } = {} }) => {
      const loading = collectionDataLoading || !shop.collectionByHandle
      const collection = loading ? null : filterQueryData(shop)
      return (
        <Provider value={{ loading, collection }}>
          {children}
        </Provider>
      )
    }}
  </Query>
)

export const CollectionConsumer = Consumer
