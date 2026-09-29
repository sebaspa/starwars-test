import { gql, type TypedDocumentNode } from '@apollo/client'
import type {
  GetCharactersData,
  GetCharactersVariables,
  GetCharacterDetailData,
  GetCharacterDetailVariables
} from './types'

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

export const GET_CHARACTER_DETAIL: TypedDocumentNode<
  GetCharacterDetailData,
  GetCharacterDetailVariables
> = gql`
  query GetCharacterDetail($id: ID!) {
    person(id: $id) {
      id
      name
      gender
      birthYear
      height
      mass
      hairColor
      skinColor
      eyeColor
      filmConnection {
        films {
          id
          title
          director
          releaseDate
          planetConnection {
            planets {
              id
              name
            }
          }
        }
      }
      homeworld {
        id
        name
      }
      species {
        id
        name
      }
      vehicleConnection {
        vehicles {
          id
          name
        }
      }
      starshipConnection {
        starships {
          id
          name
        }
      }
    }
  }
`
