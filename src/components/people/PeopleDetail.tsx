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
import PeopleDetailFilms from "./PeopleDetailFilms"
import { Button } from "primereact/button"

type PeopleDetailType = {
  people: PeopleType
}

const PeopleDetail = ({people}: PeopleDetailType) => {
  const {setPeopleByPlanet, setFilterName} = usePeopleStore((state: usePeoplesStoreState) => state)
  const {data: planetData, error: planetError, status: planetStatus } = useFetch({
    queryRepo: SWConstants.PLANETS,
    apiCall: fetchPlanetById(people.homeworld),
  });
  
  const handleSearchByHomeworld = async() => {
    try {
      const persons = await SearchByHomeworld(people.homeworld)
      setPeopleByPlanet(persons)
      setFilterName(planetData.name)
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err)
    }
  }

  return(
    <div className="peopledetail">
      <div>
        <div><span>Gender:</span> {people.gender}</div>
        <div><span>Birth Year:</span> {people.birth_year}</div>
        <div><span>Eye color:</span> {people.eye_color}</div>
        <div><span>Hair color:</span> {people.hair_color}</div>
        <div><span>Skin color:</span> {people.skin_color}</div>
        <div><span>Height:</span> {people.height} cm</div>
        <div><span>Weight:</span> {people.mass} Kg</div>
        <div className="flex">
          <div>
            <span>Homeworld: </span>{planetData?.name}
            <span 
              className="peopledetail__filterbtn" 
              
            >
            </span>
          </div>
          <Button onClick={handleSearchByHomeworld} icon="pi pi-filter" className="p-button-rounded p-button-success p-button-outlined" />
        </div>
      </div>
      <div>
        <PeopleDetailFilms people={people} />
      </div>
    </div>
  )
}
export default PeopleDetail