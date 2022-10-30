// library imports
import { Card } from 'primereact/card';
import { Badge } from 'primereact/badge';
import { useState } from 'react';

// type imports
import { PeopleType } from "../../../types/peopleType"

// component imports
import Spinner from "../../UI/Spinner"
import PeopleDetailDialog from './PeopleDetailDialog';

// helpers & misc imports
import { useGetFilmsByOnePeople } from "../../../hooks/useFilms";
import { SelectedFilm } from '../../../store/filmStore';

type PeopleDetailFilmsProps = {
  people: PeopleType,
  handleSearchByFilm: (film: string) => void, 
}

const PeopleDetailFilms = ({people, handleSearchByFilm}: PeopleDetailFilmsProps) => {
  const [isDialogVisible, setDialogVisible] = useState(false)
  const [selectedFilm, setSelectedFilm] = useState<SelectedFilm>({title: '', url: '', opening_crawl: ''})
  const {error, thisPeopleFilms} = useGetFilmsByOnePeople(people)

  const handleSelectFilm = (film: SelectedFilm) => {
    setDialogVisible(true)
    setSelectedFilm(film)
  }
  return (
    <>
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
              onClick={() => handleSelectFilm(film)}
            >
              <span>- {film.title}</span>
            </div>
          ))
          :
          <Spinner loading="loading" />
        }
      </Card>
      <PeopleDetailDialog 
        isDialogVisible={isDialogVisible}
        setDialogVisible={setDialogVisible}
        selectedFilm={selectedFilm}
        handleSearchByFilm={handleSearchByFilm}
      />
    </>
  )
}

export default PeopleDetailFilms