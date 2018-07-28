// @flow

import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'

import RootProvider from '../../src/root-provider'
import { ProductByHandle } from '../../dist/index'
import ProductTable from '../shared/components/ProductTable'

const root = document.getElementById('root')

if (!root) throw new Error('React root element not found.')

// grab a random product handle from the shopify sample graphql store
const handles = ['snare-boot', 'neptune-boot', 'arena-zip-boot', 'pin-boot', 'hanra-shirt']
const handle = handles[Math.floor(Math.random() * handles.length)]

/**
 * The RootProvider component (or similar implementation) is necessary to use any other components
 * within the shopify-apollo-components library. It wraps the application in an ApolloProvider
 * component and rigs it up with necessary details about the storefront
 * (uri, storefront access token)
 */
ReactDOM.render(
  <RootProvider
    uri="https://graphql.myshopify.com/api/graphql"
    accessToken="078bc5caa0ddebfa89cccb4a1baa1f5c"
  >
    <ProductByHandle handle={handle}>
      {({ loading, data }) => {
          if (loading) return 'product loading...'
          const { shop: { productByHandle } } = data
          return (
            <div>
              <h1>Product Details for {handle}</h1>
              <ProductTable product={productByHandle} />
            </div>
          )
        }}
    </ProductByHandle>
  </RootProvider>, root
)
