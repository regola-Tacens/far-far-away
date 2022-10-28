// type imports
import { PeopleType } from "../../types/peopleType"

// store imports
import { usePeoplesStoreState, usePeopleStore } from "../../store/peopleStore"
import { Chip } from "primereact/chip"

// crud import
import { getOnePeopleById, getPeopleByPlanet } from "../../crud/people.crud"

type PeopleDetailType = {
  people: PeopleType
}
const PeopleDetail = ({people}: PeopleDetailType) => {
  const {setPeopleByPlanet} = usePeopleStore((state: usePeoplesStoreState) => state)

  const handleSearchByHomeworld = async() => {
    const planet = people.homeworld?.match(/\d+/g)
    const peopleByPlanet = await getPeopleByPlanet(planet)
    let persons: PeopleType[]  = []

    for (let resident of peopleByPlanet.residents) {
      const id = resident.match(/\d+/g)[0]
      const newResident = await getOnePeopleById(id)
      persons.push(newResident)
    }
    setPeopleByPlanet(persons)
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
        <span>Homeworld:</span> {people.homeworld}
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