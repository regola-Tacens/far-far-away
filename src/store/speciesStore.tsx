// library imports
import create from 'zustand'

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

export const useSpeciesStore = create<useSpeciesStoreState>((set) => ({
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
}))