// type imports
import { PeopleType } from "../../../../types/peopleType"

// store imports
import { usePeoplesStoreState, usePeopleStore } from "../../../../store/peopleStore"
import { useFilterStore, useFilterStoreState } from "../../../../store/filterStore"
import { useFilmStore, useFilmStoreState } from "../../../../store/filmStore"
import { useSpeciesStore, useSpeciesStoreState } from "../../../../store/speciesStore"
import { usePlanetsStore, usePlanetsStoreState } from "../../../../store/planetStore"

// component immports
import PeopleDetailFilms from "./PeopleDetailFilms"
import PeopleDetailSearchButtons from "./PeopleDetailSearchButton"

// helpers & state imports
import useFetch from "../../../../hooks/useFetch"
import { SWConstants } from "../../../../constants/peopleConstants"

// crud import
import { searchByFilm, SearchByHomeworld, searchBySpecies } from "../../../../crud/actions/peopleActions"
import { fetchPlanetById } from "../../../../crud/planet.crud"
import { fetchSpeciesById } from "../../../../crud/species.crud"

type PeopleDetailType = {
  people: PeopleType
}

const PeopleDetail = ({people}: PeopleDetailType) => {
  const {setPeople} = usePeopleStore((state: usePeoplesStoreState) => state)
  const {setFilterName, setResetFilterButton} = useFilterStore((state: useFilterStoreState) => state)
  const {peopleActingInFilms, setPeopleActingInFilms} = useFilmStore((state: useFilmStoreState) => state)
  const {setPeopleOfSameSpecies, peopleOfSameSpecie} = useSpeciesStore((state: useSpeciesStoreState) => state)
  const {peopleOfSamePlanet, setPeopleOfSamePlanet} = usePlanetsStore((state: usePlanetsStoreState) => state)

  const {data: planetData, error: planetError, status: planetStatus } = useFetch({
    queryRepo: `${SWConstants.PLANETS}${people.name}`,
    apiCall: fetchPlanetById(people.homeworld),
    param: !!people.homeworld
  });

  const {data: speciesData, error: speciesError, status: speciesStatus } = useFetch({
    queryRepo: `${SWConstants.SPECIES}${people.name}`,
    apiCall: fetchSpeciesById(people.species),
    param: people.species.length > 0
  });
  
  const setSearchResult = (persons: PeopleType[], filterType: string, filterName: string) => {
    setPeople(persons)
    setResetFilterButton(true)
    setFilterName(filterType, filterName)
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ----------------- Search people living on a given planet -------------------//
  const handleSearchByHomeworld = async() => {
    const searchInStore = peopleOfSamePlanet.find(el => el.planetUrl === people.homeworld)
    if(searchInStore) {
      setSearchResult(searchInStore.people, SWConstants.PLANETS, searchInStore.planetName)
      return
    }
    try {
      const persons = await SearchByHomeworld(people.homeworld)
      setSearchResult(persons, SWConstants.PLANETS, planetData.name)
      setPeopleOfSamePlanet(people.homeworld, planetData.name, persons)
    } catch (err) {
      console.error(err)
    }
  }

  // ----------------- Search people of a given specie -------------------//
  const handleSearchBySpecies = async() => {
    const searchInStore = peopleOfSameSpecie.find(el => el.specieUrl === people.species)
    if(searchInStore) {
      setSearchResult(searchInStore.people, SWConstants.SPECIES, searchInStore.specieName)
      return
    }
    try {
      const persons = await searchBySpecies(people.species)
      setSearchResult(persons, SWConstants.SPECIES, speciesData.name)
      setPeopleOfSameSpecies(people.species, speciesData.name, persons)
    } catch (err) {
      console.error(err)
    }
  }

  // ----------------- Search people acting in a given film -------------------//
  const handleSearchByFilm = async(film: string) => {
    const searchInStore = peopleActingInFilms.find(el => el.filmUrl === film)
    if(searchInStore) {
      setSearchResult(searchInStore.people, SWConstants.FILM, searchInStore.filmTitle)
      return
    }
    try {
      const {persons, pickedFilm} = await searchByFilm(film)
      setSearchResult(persons, SWConstants.FILM, pickedFilm.title)
      setPeopleActingInFilms(film, pickedFilm.title, persons)
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
        <PeopleDetailSearchButtons 
          label={SWConstants.SPECIES}
          labelName={people.species.length > 0 ? speciesData?.name : 'n/a'}
          handleCallback={handleSearchBySpecies}
        />
        <PeopleDetailSearchButtons 
          label={SWConstants.PLANETS}
          labelName={planetData?.name}
          handleCallback={handleSearchByHomeworld}
        />
      </div>
      <div>
        <PeopleDetailFilms 
          people={people} 
          handleSearchByFilm={handleSearchByFilm}
        />
      </div>
    </div>
  )
}
export default PeopleDetail