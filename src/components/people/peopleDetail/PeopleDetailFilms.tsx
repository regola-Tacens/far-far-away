// library imports
import { Card } from 'primereact/card';
import { Badge } from 'primereact/badge';

// type imports
import { PeopleType } from "../../../types/peopleType"

// component imports
import Spinner from "../../UI/Spinner"

// helpers & misc imports
import { useGetFilmsByOnePeople } from "../../../hooks/useFilms";
import { useFilmStore, useFilmStoreState } from '../../../store/filmStore';

type PeopleDetailFilmsProps = {
  people: PeopleType,
  handleSearchByFilm: (film: string) => void
}

const PeopleDetailFilms = ({people, handleSearchByFilm}: PeopleDetailFilmsProps) => {
  const {error, thisPeopleFilms} = useGetFilmsByOnePeople(people)
  
  return (
    <Card title="Films" className="poepledetail__films__card">
      <Badge 
        className="poepledetail__films__badge" 
        value={thisPeopleFilms?.films?.length} 
        severity="success"
      />
      {
        thisPeopleFilms && thisPeopleFilms.films.length > 0 ?
        thisPeopleFilms.films.map((film) => (
          <div 
            className="poepledetail__films__film"
            key={film.title} 
            onClick={() => handleSearchByFilm(film.url)}
          >
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