// library imports
import create from 'zustand'

// type imports
import { PeopleType } from '../types/peopleType'

export type peopleOfSamePlanetType = {
  planetUrl: string,
  planetName: string,
  people: PeopleType[]
}

export type usePlanetsStoreState = {
  peopleOfSamePlanet: peopleOfSamePlanetType[],
  setPeopleOfSamePlanet: (planetUrl: string, planetName: string, people: PeopleType[]) => void
}

export const usePlanetsStore = create<usePlanetsStoreState>((set) => ({
  peopleOfSamePlanet: [],
  setPeopleOfSamePlanet: (planetUrl: string, planetName: string, people: PeopleType[]) => set((state) => ({
    peopleOfSamePlanet: [
      ...state.peopleOfSamePlanet,
      {
        planetUrl,
        planetName,
        people
      }
    ]
  }))
}))