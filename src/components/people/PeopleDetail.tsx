// library imports
import { useCallback, useEffect, useState } from "react"

// type imports
import { PeopleType } from "../../types/peopleType"

// store imports
import { usePeoplesStoreState, usePeopleStore } from "../../store/peopleStore"

// component immports
import { Chip } from "primereact/chip"

// helpers & state imports
import useFetch from "../../hooks/useFetch"
import { SWConstants } from "../../constants/peopleConstants"

// crud import
import { SearchByHomeworld } from "../../crud/actions/peopleActions"
import { fetchPlanetById } from "../../crud/planet.crud"
import { fetchFilmById } from "../../crud/film.crud"

type PeopleDetailType = {
  people: PeopleType
}

type Film = {
  title: string,
  url: string
}

const PeopleDetail = ({people}: PeopleDetailType) => {
  const [films, setFilms] = useState<Film[]>([])
  const {setPeopleByPlanet, setFilterName} = usePeopleStore((state: usePeoplesStoreState) => state)
  
  const {data: planetData, error: planetError, status: planetStatus } = useFetch({
    queryRepo: SWConstants.PLANETS,
    apiCall: fetchPlanetById(people.homeworld),
  });
 
  const handleSearchByHomeworld = useCallback(async() => {
    try {
      const persons = await SearchByHomeworld(people.homeworld)
      setPeopleByPlanet(persons)
      setFilterName(planetData.name)
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err)
    }
  }, [])

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

  return(
    <div className="peopledetail">
      <div><span>Gender:</span> {people.gender}</div>
      <div><span>Birth Year:</span> {people.birth_year}</div>
      <div><span>Eye color:</span> {people.eye_color}</div>
      <div><span>Hair color:</span> {people.hair_color}</div>
      <div><span>Skin color:</span> {people.skin_color}</div>
      <div><span>Height:</span> {people.height} cm</div>
      <div><span>Weight:</span> {people.mass} Kg</div>
      <div>
        <span>Homeworld:</span> {planetData?.name}
        <span 
          className="peopledetail__filterbtn" 
          onClick={handleSearchByHomeworld}
        >
          <Chip label='filter' className="mr-1 mb-1 custom-chip" />
        </span>
      </div>
      <h3>Films</h3>
      <ul>
        {
          films && films.map((film) => (
            <li key={film.title}>
              <a href={`${film.url}`} target="blank">{film.title}</a>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
export default PeopleDetail