// type imports
import { PeopleType } from "../../types/peopleType"

// store imports
import { usePeoplesStoreState, usePeopleStore } from "../../store/peopleStore"
import { useFilterStore, useFilterStoreState } from "../../store/filterStore"

// component immports
import { Button } from "primereact/button"
import PeopleDetailFilms from "./PeopleDetailFilms"

// helpers & state imports
import useFetch from "../../hooks/useFetch"
import { SWConstants } from "../../constants/peopleConstants"

// crud import
import { SearchByHomeworld } from "../../crud/actions/peopleActions"
import { fetchPlanetById } from "../../crud/planet.crud"
import { fetchSpeciesById } from "../../crud/species.crud"

type PeopleDetailType = {
  people: PeopleType
}

const PeopleDetail = ({people}: PeopleDetailType) => {
  const {setPeopleByPlanet} = usePeopleStore((state: usePeoplesStoreState) => state)
  const {setFilterName, setResetFilterButton} = useFilterStore((state: useFilterStoreState) => state)

  const {data: planetData, error: planetError, status: planetStatus } = useFetch({
    queryRepo: SWConstants.PLANETS,
    apiCall: fetchPlanetById(people.homeworld),
    param: !!people.homeworld
  });

  const {data: speciesData, error: speciesError, status: speciesStatus } = useFetch({
    queryRepo: SWConstants.SPECIES,
    apiCall: fetchSpeciesById(people.species),
    param: people.species.length > 0
  });

  const handleSearchByHomeworld = async() => {
    try {
      const persons = await SearchByHomeworld(people.homeworld)
      setPeopleByPlanet(persons)
      setFilterName(planetData.name)
      setResetFilterButton(true)
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
        <div><span>Species:</span> {people.species.length > 0 ? speciesData?.name : 'n/a'}</div>
        <div className="flex">
          <div>
            <div className="peopledetail__filterbtn">Homeworld: {planetData?.name}</div>
          </div>
          <Button 
            className="p-button-rounded p-button-success p-button-outlined"
            onClick={handleSearchByHomeworld} 
            icon="pi pi-filter" 
          />
        </div>
      </div>
      <div>
        <PeopleDetailFilms people={people} />
      </div>
    </div>
  )
}
export default PeopleDetail