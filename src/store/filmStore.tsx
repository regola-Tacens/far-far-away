import create from 'zustand'
import { FilmType } from '../types/filmsType'

export type FilmsByOnePeople = {
  name: string
  films: Pick<FilmType, 'title' | 'url'>[]
}

export type useFilmStoreState = {
  filmsByPeople: FilmsByOnePeople[],
  setFilmsByPeople: (name: string, films: Pick<FilmType, 'title' | 'url'>[]) => void
}

export const useFilmStore = create<useFilmStoreState>((set) => ({
  filmsByPeople: [],
  setFilmsByPeople: (name: string, films: Pick<FilmType, 'title' | 'url'>[]) => set((state) =>({
    filmsByPeople: [
      ...state.filmsByPeople,
      {
        name,
        films
      }
    ],
  })),

}))