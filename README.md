# Shopify Apollo Components

Wrappers around the react-apollo Query components for the shopify storefront api: https://help.shopify.com/en/api/custom-storefronts/storefront-api/reference

`yarn add shopify-apollo-components`

## Usage

### 1. Add React-Apollo to the root of your application

* wrap your application with the RootProvider component and pass it props:
  * uri: your storefront-api uri (https://your-store.myshopify.com/api/graphql)
  * accessToken: your storfront-access-token (creat via private app) 


```js

import React from 'react'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'

const creatClient = (uri, accessToken) => {
  const middlewareLink = setContext(() => ({
    headers: { 'X-Shopify-Storefront-Access-Token': accessToken }
  }))

  const httpLink = createHttpLink({ uri })

  return new ApolloClient({
    link: middlewareLink.concat(httpLink),
    cache: new InMemoryCache(),
  })
}

const RootProvider = ({ accessToken, uri, children }) => (
  <ApolloProvider client={creatClient(uri, accessToken)}>
    {children}
  </ApolloProvider>
)

export default RootProvider

``` 

### 2. Use the components with render functions

```js
import React from 'react'
import { ProductByHandle } from 'shopify-apollo-components';


const ProductView = ({ handle }) => {
  return (
    <ProductByHandle handle={handle}>
       {({ loading, data }) => {
           if (loading) return 'product loading...'
           const { shop: { productByHandle: product } } = data
           return (
             <div>
               <h1>Product Details for {product.title}</h1>
               {/* Build your product view */}
             </div>
           )
         }}
     </ProductByHandle>
  )
}

export default ProductView



```

### 3. Sit back and relax