import create from 'zustand'
//@ts-ignore
import { devtools, persist, StoreApiWithPersist} from 'zustand/middleware'

// types import
import { FilmType } from '../types/filmsType'
import { PeopleType } from '../types/peopleType'

export type SelectedFilm = Pick<FilmType, 'title' | 'url' | 'opening_crawl'>

export type FilmsByOnePeople = {
  name: string,
  films: SelectedFilm[]
}

export type useFilmStoreState = {
  filmsByPeople: FilmsByOnePeople[],
  setFilmsByPeople: (name: string, films: Pick<FilmType, 'title' | 'url' |'opening_crawl'>[]) => void,
  setPeopleActingInFilms: (filmUrl: string, filmTitle: string, people: PeopleType[]) => void,
  peopleActingInFilms: {
    filmUrl: string,
    filmTitle: string,
    people: PeopleType[]
  }[]
}

export const useFilmStore = create<useFilmStoreState, StoreApiWithPersist<useFilmStoreState>>(
  persist(
  (set) => ({
    filmsByPeople: [],
    peopleActingInFilms: [],
    setFilmsByPeople: (name: string, films: Pick<FilmType, 'title' | 'url' | 'opening_crawl'>[]) => set((state) =>({
      filmsByPeople: [
        ...state.filmsByPeople,
        {
          name,
          films
        }
      ],
    })),
    setPeopleActingInFilms: (filmUrl: string, filmTitle: string, people: PeopleType[]) => set((state) => ({
      peopleActingInFilms : [
        ...state.peopleActingInFilms,
        {
          filmUrl,
          filmTitle,
          people
        }
      ]
    }))
  }),
  {
    name: "films"
  }
  )

)