// library imports
import { swapiAPI } from './axios'

//types imports
import { StarWarsApiResponseType } from '../types/peopleType'

export const fetchPlanetById = (homeworld: string) => {
  const id = homeworld.match(/\d+/g)
  return swapiAPI
    .get<StarWarsApiResponseType>(`/planets/${id}`, {})
    .then(response => response.data)
}