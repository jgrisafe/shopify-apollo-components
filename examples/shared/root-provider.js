// @flow

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
