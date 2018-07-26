// @flow
import React from 'react'

const ProductTable = ({ product }) => (
  <table cellPadding="10" border="1px solid">
    <tbody>
      <tr>
        <th>Field</th>
        <th>Value</th>
      </tr>
      {
        Object.keys(product).map((key, index) => (
          <tr key={`product-detail-row-${index}`}>
            <td>{key}</td>
            <td>{product[key].toString().substring(0, 50)}</td>
          </tr>
        ))
      }
    </tbody>
  </table>
)

export default ProductTable
