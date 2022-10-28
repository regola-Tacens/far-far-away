import create from 'zustand'
import { StarWarsApiResponseType } from '../types/peopleType'

const initialPeopleState = {
  count: 0,
  next: '',
  previous: '',
  results: []
}

export type usePeoplesStoreState = {
  peopleStore: StarWarsApiResponseType,
  initialPeopleState: StarWarsApiResponseType,
  setPeople: (people: StarWarsApiResponseType) => void
  setInitialPeople: (people: StarWarsApiResponseType) => void
  searchByHomeworld: (homeworld: string) => void,
  resetFilterButton: boolean,
  setResetFilterButton: () => void
}

export const usePeopleStore = create<usePeoplesStoreState>((set) => ({
  peopleStore: initialPeopleState,
  initialPeopleState: initialPeopleState,
  resetFilterButton: false,
  setPeople: (starWarsResponse: StarWarsApiResponseType) => set((state) => ({
    peopleStore: starWarsResponse
  })),
  setInitialPeople: (starWarsResponse: StarWarsApiResponseType) => set((state) => ({
    initialPeopleState: starWarsResponse
  })),
  searchByHomeworld: (homeworld: string) => set((state) => ({
    peopleStore: {
      ...state.peopleStore,
      results: [
        ...state.peopleStore.results.filter(people => people.homeworld === homeworld)
      ]
    },
    resetFilterButton: true
  })),
  setResetFilterButton: () => set((state) =>({
    resetFilterButton: false
  }))
}))
