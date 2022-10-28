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
  setPeople: (people: StarWarsApiResponseType) => void
  setInitialPeople: (people: StarWarsApiResponseType) => void
  searchByHomeworld: (homeworld: string) => void,
  resetFilterButton: boolean,
  setResetFilterButton: () => void,
  setPeopleByPlanet: (persons: PeopleType[]) => void,
  filterName: string, 
  setFilterName: (filterName: string) => void,
  activeIndex: number,
}

export const usePeopleStore = create<usePeoplesStoreState>((set) => ({
  peopleStore: initialPeopleState,
  initialPeopleState: initialPeopleState,
  resetFilterButton: false,
  filterName:'',
  activeIndex: -1,
  setPeople: (starWarsResponse: StarWarsApiResponseType) => set((state) => ({
    peopleStore: starWarsResponse
  })),
  setInitialPeople: (starWarsResponse: StarWarsApiResponseType) => set((state) => ({
    initialPeopleState: starWarsResponse
  })),
  setPeopleByPlanet: (persons: PeopleType[]) => set((state) =>({
    peopleStore: {
      ...state.peopleStore,
      results: persons
    },
    resetFilterButton: true
  })),
  searchByHomeworld: (homeworld: string) => set((state) => ({
    peopleStore: {
      ...state.peopleStore,
      results: [
        ...state.peopleStore.results.filter(people => people.homeworld === homeworld)
      ]
    },
    resetFilterButton: true,
    activeIndex: -1
  })),
  setResetFilterButton: () => set((state) =>({
    resetFilterButton: false,
    filterName: ''
  })),
  setFilterName: (filterName: string) => set((state) => ({
    filterName: filterName
  }))
}))
