// @flow

import React from 'react'
import { ProductByHandle } from '../../../dist'

// eslint-disable-next-line
const { Provider, Consumer }: React.createContext<any> = React.createContext()

export const ProductProvider = ({ handle, children }: { handle: string, children: Object }) => (
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
