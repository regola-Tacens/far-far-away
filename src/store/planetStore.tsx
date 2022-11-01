// library imports
import create from 'zustand'
//@ts-ignore
import { devtools, persist, StoreApiWithPersist} from 'zustand/middleware'

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

export const usePlanetsStore = create<usePlanetsStoreState, StoreApiWithPersist<usePlanetsStoreState> >(
  persist(
    (set) => ({
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
    }),
    {
      name: 'planets'
    }
  )
)