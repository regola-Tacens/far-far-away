export type FilmType = {
  title: string,
  episode_id: number,
  opening_crawl: string,
  director: string,
  producer: string,
  release_date: Date,
  species: string[],
  starships: string[],
  vehicles: string[],
  characters: string[],
  planets: string[]
  url: string,
  created: string,
  edited: string
}

export type PeopleType = {
  name: string,
  birth_year :string,
  eye_color: string,
  gender: string,
  hair_color: string,
  height: string,
  mass: string,
  skin_color: string,
  homeworld: string,
  films: FilmType[],
  species: [],
  starships: [],
  vehicles: [],
  url: string,
  created: string,
  edited: string
}

export type StarWarsApiResponseType = {
  count: number, 
  next: string | null,
  previous: string | null,
  results: PeopleType[] 
}