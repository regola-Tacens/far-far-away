// type imports
import { FilmType } from '../types/filmsType'

// axios
import { swapiAPI } from './axios'

export async function fetchFilmById(film: Pick<FilmType, 'title' | 'url'>) {
  const filmId: string = film.match(/\d+/g)?.[0]
  try {
    const response = await swapiAPI.get(`/films/${filmId}`)
    return Promise.resolve(response.data)
  } catch (err) {
    return Promise.reject(err)
  }
}