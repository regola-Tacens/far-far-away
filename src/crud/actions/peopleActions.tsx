// type imports
import { PeopleType } from "../../types/peopleType"

// crud imports
import { getOnePeopleById, getPeopleByPlanet } from "../people.crud"

/**
 * @description - returns array of persons living on a given panet
 * @param {string} homeworld 
 * 
 * @returns {array} - array of persons
 */
export const SearchByHomeworld = async(homeworld: string) => {
    const planet = homeworld.match(/\d+/g)
    const peopleByPlanet = await getPeopleByPlanet(planet)
    let persons: PeopleType[]  = []

    for (let resident of peopleByPlanet.residents) {
      const id = resident.match(/\d+/g)[0]
      const newResident = await getOnePeopleById(id)
      persons.push(newResident)
    }
    
  return persons
}