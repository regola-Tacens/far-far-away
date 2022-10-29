// library imports
import { Card } from 'primereact/card';
import { Badge } from 'primereact/badge';

// type imports
import { PeopleType } from "../../types/peopleType"

// component imports
import Spinner from "../UI/Spinner"
import { useGetFilmsByOnePeople } from "../../hooks/useFilms";

type PeopleDetailFilmsProps = {
  people: PeopleType
}

const PeopleDetailFilms = ({people}: PeopleDetailFilmsProps) => {
  const {films, error} = useGetFilmsByOnePeople(people)

  return (
    <Card title="Films" className="poepledetail__films__card">
      <Badge className="poepledetail__films__badge" value={films.length} severity="success" />
      {
        films.length > 0 ?
        films.map((film) => (
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