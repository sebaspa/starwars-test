import { gql, type TypedDocumentNode } from '@apollo/client'
import type { GetCharactersData, GetCharactersVariables } from './types'

export const GET_CHARACTERS: TypedDocumentNode<
  GetCharactersData,
  GetCharactersVariables
> = gql`
  query GetCharacters($first: Int!, $after: String) {
    allPeople(first: $first, after: $after) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
      people {
        id
        name
        gender
        birthYear
      }
    }
  }
`
