// type imports
import { PeopleType } from "../../types/peopleType"

// store imports
import { usePeoplesStoreState, usePeopleStore } from "../../store/peopleStore"

// component immports
import { Chip } from "primereact/chip"

// helpers & state imports
import { SearchByHomeworld } from "../../crud/actions/peopleActions"
import useFetch from "../../hooks/useFetch"

// crud import
import { SWConstants } from "../../constants/peopleConstants"
import { fetchPlanetById } from "../../crud/planet.crud"

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
    } catch (err) {
      console.error(err)
    }
  }

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
          people.films && people.films.map((film) => (
            <li key={film}>
              <a href={`${film}`} target="blank">{film}</a>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
export default PeopleDetail