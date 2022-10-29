// library imports
import { Card } from 'primereact/card';
import { Badge } from 'primereact/badge';

// type imports
import { PeopleType } from "../../types/peopleType"
import { FilmType } from '../../types/filmsType';

// component imports
import Spinner from "../UI/Spinner"

// helpers & misc imports
import { useGetFilmsByOnePeople } from "../../hooks/useFilms";

type PeopleDetailFilmsProps = {
  people: PeopleType,
  handleSearchByFilm: (film: string) => void
}

const PeopleDetailFilms = ({people, handleSearchByFilm}: PeopleDetailFilmsProps) => {
  const {films, error} = useGetFilmsByOnePeople(people)
  
  return (
    <Card title="Films" className="poepledetail__films__card">
      <Badge className="poepledetail__films__badge" value={films.length} severity="success" />
      {
        films.length > 0 ?
        films.map((film) => (
          <div className="poepledetail__films__film" key={film.title} onClick={() => handleSearchByFilm(film.url)}>
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