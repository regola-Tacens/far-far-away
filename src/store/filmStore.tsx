import create from 'zustand'
import { FilmType } from '../types/filmsType'

export type SelectedFilm = Pick<FilmType, 'title' | 'url' | 'opening_crawl'>

export type FilmsByOnePeople = {
  name: string
  films: SelectedFilm[]
}

export type useFilmStoreState = {
  filmsByPeople: FilmsByOnePeople[],
  setFilmsByPeople: (name: string, films: Pick<FilmType, 'title' | 'url' |'opening_crawl'>[]) => void
}

export const useFilmStore = create<useFilmStoreState>((set) => ({
  filmsByPeople: [],
  setFilmsByPeople: (name: string, films: Pick<FilmType, 'title' | 'url' | 'opening_crawl'>[]) => set((state) =>({
    filmsByPeople: [
      ...state.filmsByPeople,
      {
        name,
        films
      }
    ],
  })),

}))