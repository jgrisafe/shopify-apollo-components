# Shopify Apollo Components

Wrappers around the react-apollo Query components for the shopify storefront api: https://help.shopify.com/en/api/custom-storefronts/storefront-api/reference

`yarn add shopify-apollo-components`

## Usage

### 1. Add React-Apollo to the root of your application

* wrap your application with the RootProvider component and pass it props:
  * uri: your storefront-api uri (https://your-store.myshopify.com/api/graphql)
  * accessToken: your storefront-access-token (created via private app) 


```jsx harmony
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { RootProvider } from 'shopify-apollo-components'

const root = document.getElementById('app')

if (!root) throw new Error('React root element not found.')

ReactDOM.render(
  <Router>
    <RootProvider
      uri="https://vape-allegiance.myshopify.com/api/graphql"
      accessToken="375d3adfc86edf78ab66f8900da074d5"
    >
      {/* your app here */}
    </RootProvider>
  </Router>, root
)
``` 

### 2. Use the components with render functions

```jsx harmony
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
