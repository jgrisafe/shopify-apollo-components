# Shopify Apollo Components

Wrappers around the react-apollo Query components for the shopify storefront api: https://help.shopify.com/en/api/custom-storefronts/storefront-api/reference

`yarn add shopify-apollo-components`

## Examples
`yarn basic-example`
`yarn context-example`

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
      uri="https://your-store.myshopify.com/api/graphql"
      accessToken="xxxxxxx"
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

### 3. Use react context at the root of your pages to get easy access to the page's product or collection without needing to access the url params
### The context components
```jsx harmony
const { Provider, Consumer } = React.createContext()

export const ProductProvider = ({ handle, children }) => (
  <ProductByHandle handle={handle}>
    {({ loading, data }) => {
      const { shop: { productByHandle } } = data
      return (
        <Provider value={{ product: productByHandle, loading }}>
          {children}
        </Provider>
      )
    }}
  </ProductByHandle>
)

export const ProductConsumer = Consumer

```

#### Use the Consumer anywhere nested under the Provider
```jsx harmony
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
```

### 4. Sit back and relax
