// library imports
import { Badge } from "primereact/badge"
import { Chip } from "primereact/chip"

// store imports
import { usePeoplesStoreState, usePeopleStore } from "../../store/peopleStore"

const PeopleSearchFilters = () => {
  const {peopleStore, filterName, setPeople, initialPeopleState, resetFilterButton, setResetFilterButton} = usePeopleStore((state: usePeoplesStoreState) => state)
  if (!resetFilterButton) return null

  const peopleQuantity = peopleStore?.results?.length

  const handleResetPeople = () => {
    setPeople(initialPeopleState)
    setResetFilterButton()
  }

  return (
    <div className="search__filters" onClick={handleResetPeople}>
      <Badge 
        className="search__filters__badge" 
        value={peopleQuantity} 
        severity="success"
      />
      <Chip 
        className="p-mb-2" 
        label={`Living on planet ${filterName}`} 
        removable 
      />
    </div>
  )
}

export default PeopleSearchFilters