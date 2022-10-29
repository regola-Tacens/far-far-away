import create from 'zustand'
import { PeopleType, StarWarsApiResponseType } from '../types/peopleType'

const initialPeopleState = {
  count: 0,
  next: '',
  previous: '',
  results: []
}

export type usePeoplesStoreState = {
  peopleStore: StarWarsApiResponseType,
  initialPeopleState: StarWarsApiResponseType,
  setPeopleStore: (people: StarWarsApiResponseType) => void
  setInitialPeople: (people: StarWarsApiResponseType) => void
  searchByHomeworld: (homeworld: string) => void,
  setPeople: (persons: PeopleType[]) => void,
  activeIndex: number,
  resetActiveIndex: () => void
}

export const usePeopleStore = create<usePeoplesStoreState>((set) => ({
  peopleStore: initialPeopleState,
  initialPeopleState: initialPeopleState,
  activeIndex: -1,
  setPeopleStore: (starWarsResponse: StarWarsApiResponseType) => set((state) => ({
    peopleStore: starWarsResponse
  })),
  setInitialPeople: (starWarsResponse: StarWarsApiResponseType) => set((state) => ({
    initialPeopleState: starWarsResponse
  })),
  setPeople: (persons: PeopleType[]) => set((state) =>({
    peopleStore: {
      ...state.peopleStore,
      results: persons
    },
  })),
  searchByHomeworld: (homeworld: string) => set((state) => ({
    peopleStore: {
      ...state.peopleStore,
      results: [
        ...state.peopleStore.results.filter(people => people.homeworld === homeworld)
      ]
    },
    activeIndex: -1
  })),
  resetActiveIndex: () => set((state) => ({
    activeIndex: -1
  })),
}))
