// library import
import axios from 'axios'

export const swapiAPI = axios.create({
  baseURL: 'https://swapi.dev/api/',
});