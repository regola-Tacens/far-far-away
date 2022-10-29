// library imports
import { Badge } from "primereact/badge"
import { Chip } from "primereact/chip"

// store imports
import { useFilterStore, useFilterStoreState } from "../../store/filterStore"
import { usePeoplesStoreState, usePeopleStore } from "../../store/peopleStore"

const PeopleSearchFilters = () => {
  const {peopleStore, setPeople, initialPeopleState} = usePeopleStore((state: usePeoplesStoreState) => state)
  const {filterType, filterName, resetFilterButton, setResetFilterButton} = useFilterStore((state: useFilterStoreState) => state)

  if (!resetFilterButton) return null
  const peopleQuantity = peopleStore?.results?.length

  const handleResetPeople = () => {
    setPeople(initialPeopleState)
    setResetFilterButton(false)
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
        label={`${filterType} ${filterName}`} 
        removable 
      />
    </div>
  )
}

export default PeopleSearchFilters