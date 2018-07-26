// @flow

import 'babel-polyfill'
import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import RootProvider from '../shared/root-provider'
import { ProductByHandle } from '../../dist/index'

const root = document.getElementById('root')

if (!root) throw new Error('React root element not found.')

const handles = ['snare-boot', 'neptune-boot', 'arena-zip-boot', 'pin-boot', 'hanra-shirt']
const handle = handles[Math.floor(Math.random() * handles.length)]

ReactDOM.render(
  <RootProvider
    s
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
              <table cellPadding="10" border="1px solid">
                <tbody>
                  <tr>
                    <th>Field</th>
                    <th>Value</th>
                  </tr>
                  {
                    Object.keys(productByHandle).map((key, index) => (
                      <tr key={`product-detail-row-${index}`}>
                        <td>{key}</td>
                        <td>{productByHandle[key].toString().substring(0, 50)}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          )
        }}
    </ProductByHandle>
  </RootProvider>, root
)

window.slate = window.slate || {}
window.theme = window.theme || {}
