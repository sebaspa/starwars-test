import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { registerApolloClient } from '@apollo/client-integration-nextjs'

const ENDPOINT = 'https://swapi-graphql.netlify.app/graphql'

const httpLink = new HttpLink({ uri: ENDPOINT })

// Cliente para Server Components (RSC)
export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink
  })
})
