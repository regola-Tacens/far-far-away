// library imports
import { useEffect, useState } from "react"

// crud import
import { fetchFilmById } from "../crud/film.crud"
import { useFilmStore, useFilmStoreState } from "../store/filmStore"

// type imports
import { FilmType } from "../types/filmsType"
import { PeopleType } from "../types/peopleType"

type Film = Pick<FilmType, 'title' | 'url'>

export const useGetFilmsByOnePeople = (people: PeopleType ) => {
  const [error, setErrors] = useState<string>()
  const {filmsByPeople, setFilmsByPeople} = useFilmStore((state: useFilmStoreState) => state)
  const thisPeopleFilms = filmsByPeople.find(filmByOnePeople => filmByOnePeople.name === people.name)

  const isObject = (obj: any) => {
    return Object.prototype.toString.call(obj) === '[object Object]'
  }
  const isPeopleFilmAlreadyInStore = isObject(filmsByPeople.find(peoplefilm => peoplefilm.name === people.name))

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
        setFilmsByPeople(people.name, filmsArray)
      } catch (err) {
        setErrors(JSON.stringify(err))
      }
    }
    people && !isPeopleFilmAlreadyInStore && getFilms()
  }, [people])

  return {error, thisPeopleFilms}
}