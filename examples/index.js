// @flow

import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import RootProvider from './context/root-provider'

ReactDOM.render(
    <RootProvider
      uri="https://vape-allegiance.myshopify.com/api/graphql"
      accessToken="375d3adfc86edf78ab66f8900da074d5"
    >
      <div>Hello World</div>
    </RootProvider>, root
)

window.slate = window.slate || {}
window.theme = window.theme || {}
