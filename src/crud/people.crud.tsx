// library imports
import { swapiAPI } from './axios'
import axios from 'axios'

let peopleApi = axios.create({
  baseURL: 'https://swapi.dev/api/'
})

//types imports
import { StarWarsApiResponseType } from '../types/peopleType'

export const fetchPeople = (page?: number) => {
  return swapiAPI
    .get<StarWarsApiResponseType>(`/people/?page=${page ? page : '1'}`, {})
    .then(response => response.data)
}

export async function getPeople(page: number) {
  try {
    const response = await peopleApi.get(`/people/?page=${page}`)
    return Promise.resolve(response.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export async function getOnePeopleById(id: number) {
  try {
    const response = await peopleApi.get(`/people/${id}`)
    return Promise.resolve(response.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export async function getPeopleByPlanet(planet: string) {
  try {
    const response = await peopleApi.get(`/planets/${planet}`)
    return Promise.resolve(response.data)
  } catch (err) {
    return Promise.reject(err)
  }
}