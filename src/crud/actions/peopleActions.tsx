// type imports
import { PeopleType } from "../../types/peopleType"

// crud imports
import { getOnePeopleById, getPeopleByFilm, getPeopleByPlanet, getPeopleBySpecies } from "../people.crud"

/**
 * @description - returns array of persons living on a given panet
 * @param {string} homeworld 
 * 
 * @returns {array} - array of persons
 */
export const SearchByHomeworld = async(homeworld: string) => {
    const planet = homeworld.match(/\d+/g)
    try {
      const peopleByPlanet = await getPeopleByPlanet(planet)
      let persons: PeopleType[]  = []
  
      for (let resident of peopleByPlanet.residents) {
        const id = resident.match(/\d+/g)[0]
        const newResident = await getOnePeopleById(id)
        persons.push(newResident)
      }
      return Promise.resolve(persons)
    } catch (err) {
      return Promise.reject(err)
    }
}

/**
 * @description - returns array of persons of a given species
 * @param {string[]} specie 
 * 
 * @returns {array} - array of persons
 */
 export const searchBySpecies = async(species: string[]) => {
  const specieId = species[0].match(/\d+/g)
  try {
    const specie = await getPeopleBySpecies(Number(specieId))
    let persons: PeopleType[]  = []

    for (let people of specie.people) {
      const id = people.match(/\d+/g)[0]
      const newResident = await getOnePeopleById(id)
      persons.push(newResident)
    }
    return Promise.resolve(persons)
  } catch (err) {
    return Promise.reject(err)
  }
}

/**
 * @description - returns array of persons and film infos of a given film
 * @param {string} film 
 * 
 * @returns {array} - array of persons
 */
 export const searchByFilm = async(film: string) => {
  const filmId = film.match(/\d+/g)
  try {
    const film = await getPeopleByFilm(Number(filmId))
    let persons: PeopleType[]  = []

    for (let character of film.characters) {
      const id = character.match(/\d+/g)[0]
      const newResident = await getOnePeopleById(id)
      persons.push(newResident)
    }
    return Promise.resolve({persons, pickedFilm: film})
  } catch (err) {
    return Promise.reject(err)
  }
}