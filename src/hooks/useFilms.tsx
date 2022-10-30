// library imports
import { useEffect, useState } from "react"

// crud import
import { fetchFilmById } from "../crud/film.crud"
import { SelectedFilm, useFilmStore, useFilmStoreState } from "../store/filmStore"

// type imports
import { PeopleType } from "../types/peopleType"

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
        let filmsArray: SelectedFilm[] = []
        for(let film of people.films) {
          const result: SelectedFilm = await fetchFilmById(film)
          filmsArray.push({
            title: result.title,
            url: result.url,
            opening_crawl: result.opening_crawl
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