// library imports
import { swapiAPI } from './axios'

export async function fetchFilmById(film: string) {
  const filmId = film.match(/\d+/g)?.[0]
  try {
    const response = await swapiAPI.get(`/films/${filmId}`)
    return Promise.resolve(response.data)
  } catch (err) {
    return Promise.reject(err)
  }
}