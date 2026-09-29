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


export interface GetCharacterDetailData {
  person: {
    __typename?: 'Person'
    id: string
    name: string
    gender: string | null
    birthYear: string | null
    height: number | null
    mass: number | null
    hairColor: string | null
    skinColor: string | null
    eyeColor: string | null
    homeworld: {
      __typename?: 'Planet'
      id: string
      name: string
    } | null
    species: {
      __typename?: 'Species'
      id: string
      name: string
    } | null
    filmConnection: {
      __typename?: 'PersonFilmsConnection'
      films: Array<{
        __typename?: 'Film'
        id: string
        title: string
        director: string
        releaseDate: string | null
        planetConnection: {
          __typename?: 'FilmPlanetsConnection'
          planets: Array<{
            __typename?: 'Planet'
            id: string
            name: string
          }>
        }
      }>
    }
    vehicleConnection: {
      __typename?: 'PersonVehiclesConnection'
      vehicles: Array<{
        __typename?: 'Vehicle'
        id: string
        name: string
      }>
    }
    starshipConnection: {
      __typename?: 'PersonStarshipsConnection'
      starships: Array<{
        __typename?: 'Starship'
        id: string
        name: string
      }>
    }
  } | null
}

export interface GetCharacterDetailVariables {
  id: string
}

