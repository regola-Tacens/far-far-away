// library imports
import { swapiAPI } from './axios'

//types imports
import { StarWarsApiResponseType } from '../types/peopleType'

export const fetchPeople = (page?: number) => {
  return swapiAPI
    .get<StarWarsApiResponseType>(`/people/?page=${page ? page : '1'}`, {})
    .then(response => response.data)
}

export async function getPeople(page: number) {
  try {
    const response = await swapiAPI.get(`/people/?page=${page}`)
    return Promise.resolve(response.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export async function getOnePeopleById(id: number) {
  try {
    const response = await swapiAPI.get(`/people/${id}`)
    return Promise.resolve(response.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export async function getPeopleByPlanet(planet: string[] | null) {
  try {
    const response = await swapiAPI.get(`/planets/${planet}`)
    return Promise.resolve(response.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export async function getPeopleBySpecies(specieId: number) {
  try {
    const response = await swapiAPI.get(`/species/${specieId}`)
    return Promise.resolve(response.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export async function getPeopleByFilm(filmId: number) {
  try {
    const response = await swapiAPI.get(`/films/${filmId}`)
    return Promise.resolve(response.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export async function getPeopleByName(name: string) {
  try {
    const response = await swapiAPI.get(`/people/?search=${name}`)
    return Promise.resolve(response.data)
  } catch (err) {
    return Promise.reject(err)
  }
}