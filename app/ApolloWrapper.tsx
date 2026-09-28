'use client'

import { HttpLink } from '@apollo/client'
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache
} from '@apollo/client-integration-nextjs'

const ENDPOINT = 'https://swapi-graphql.netlify.app/graphql'

function makeClient () {
  const httpLink = new HttpLink({
    uri: ENDPOINT,
    fetchOptions: {}
  })

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink
  })
}

export function ApolloWrapper ({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}
