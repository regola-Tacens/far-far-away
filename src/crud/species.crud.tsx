// library imports
import { swapiAPI } from './axios'

//types imports
import { StarWarsApiResponseType } from '../types/peopleType'

export const fetchSpeciesById = (species: string[]) => {
  const id = species[0]?.match(/\d+/g)
  
  return swapiAPI
    .get<StarWarsApiResponseType>(`/species/${id?.[0]}`, {})
    .then(response => response.data)
}