// library imports
import { useEffect, useState } from "react"

// crud import
import { fetchFilmById } from "../crud/film.crud"

// type imports
import { FilmType } from "../types/filmsType"
import { PeopleType } from "../types/peopleType"

type Film = Pick<FilmType, 'title' | 'url'>

export const useGetFilmsByOnePeople = (people: PeopleType ) => {
  const [films, setFilms] = useState<Film[]>([])
  const [error, setErrors] = useState<string>()

  useEffect(() => {
    const getFilms = async() => {
      try {
        let filmsArray: Film[] = []
        for(let film of people.films) {
          const result: Film = await fetchFilmById(film)
          filmsArray.push({
            title: result.title,
            url: result.url
          })
        }
        setFilms(filmsArray)
      } catch (err) {
        setErrors(JSON.stringify(err))
      }
    }
    people && getFilms()
  }, [people])

  return {films, error}
}