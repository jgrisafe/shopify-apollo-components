// @flow

import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'

const root = document.getElementById('app')

if (!root) throw new Error('React root element not found.')

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