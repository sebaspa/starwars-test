export interface GetCharactersData {
  allPeople: {
    __typename?: 'PeopleConnection'
    totalCount: number
    pageInfo: {
      __typename?: 'PageInfo'
      hasNextPage: boolean
      endCursor: string | null
    }
    people: Array<{
      __typename?: 'Person'
      id: string
      name: string
      gender: string | null
      birthYear: string | null
    }>
  }
}

export interface GetCharactersVariables {
  first: number
  after?: string | null
}


