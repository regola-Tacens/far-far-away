// library imports
import create from 'zustand'
//@ts-ignore
import { devtools, persist, StoreApiWithPersist} from 'zustand/middleware'

// type imports
import { PeopleType } from '../types/peopleType'

export type useSpeciesStoreState = {
  peopleOfSameSpecie: {
    specieUrl: string[],
    specieName: string,
    people: PeopleType[]
  }[],
  setPeopleOfSameSpecies: (specieUrl: string[], specieName: string, people: PeopleType[]) => void
}

export const useSpeciesStore = create<useSpeciesStoreState, StoreApiWithPersist<useSpeciesStoreState>>(
  persist(
  (set) => ({
    peopleOfSameSpecie: [],
    setPeopleOfSameSpecies: (specieUrl: string[], specieName: string, people: PeopleType[]) => set((state) => ({
      peopleOfSameSpecie: [
        ...state.peopleOfSameSpecie,
        {
          specieUrl,
          specieName,
          people
        }
      ]
    }))
  }),
  {
    name: 'species'
  })
)