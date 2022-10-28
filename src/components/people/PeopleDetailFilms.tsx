// library imports
import { useEffect, useState } from "react"
import { Card } from 'primereact/card';
import { Badge } from 'primereact/badge';

// crud import
import { fetchFilmById } from "../../crud/film.crud"

// type imports
import { PeopleType } from "../../types/peopleType"

// component imports
import Spinner from "../UI/Spinner"

type PeopleDetailFilmsProps = {
  people: PeopleType
}
type Film = {
  title: string,
  url: string
}

const PeopleDetailFilms = ({people}: PeopleDetailFilmsProps) => {
  const [films, setFilms] = useState<Film[]>([])
  
  useEffect(() => {
    const getFilms = async() => {
      try {
        let films: Film[] = []
        for(let film of people.films) {
          const result: Film = await fetchFilmById(film)
          films.push({title: result.title, url: result.url})
        }
        setFilms(films)
      } catch (err) {
        console.error(err)
      }
    }
    getFilms()
  }, [])

  return (
    <Card title="Films" className="poepledetail__films">
      <Badge className="poepledetail__films__badge" value={films.length} severity="success" />
      {
        films.length > 0 ?
        films && films.map((film) => (
          <div key={film.title}>
            - {film.title}
          </div>
        ))
        :
        <Spinner loading="loading" />
      }
    </Card>
  )
}

export default PeopleDetailFilms