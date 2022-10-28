// library imports
import { swapiAPI } from './axios'

//types imports
import { StarWarsApiResponseType } from '../types/peopleType'
import { peopleApi } from './people.crud'

// export const fetchFilmById = (homeworld: string) => {
//   const id = homeworld.match(/\d+/g)
//   return swapiAPI
//     .get<StarWarsApiResponseType>(`/planets/${id}`, {})
//     .then(response => response.data)
// }

export async function fetchFilmById(film: string) {
  const filmId = film && film.match(/\d+/g)[0]
  try {
    const response = await peopleApi.get(`/films/${filmId}`)
    return Promise.resolve(response.data)
  } catch (err) {
    return Promise.reject(err)
  }
}