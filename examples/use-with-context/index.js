// @flow

import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'

import RootProvider from '../../src/root-provider'
import { ProductProvider, ProductConsumer } from './product-context';
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
    {/* wrap the product page in this provider, and it will grab the handle for the url */}
    {/* allowing you to use the ProductConsumer from any nested component to retrieve the */}
    {/* product */}
    <ProductProvider handle={handle}>
      <ProductConsumer>
        {({ product, loading }) => {
          if (loading) return 'product loading...'
          return (
            <ProductTable product={product} />
          )
        }}
      </ProductConsumer>
    </ProductProvider>
  </RootProvider>, root
)
