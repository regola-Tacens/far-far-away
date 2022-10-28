import { Chip } from "primereact/chip"
import { usePeoplesStoreState, usePeopleStore } from "../../store/peopleStore"

const PeopleSearchFilters = () => {
  const {filterName} = usePeopleStore((state: usePeoplesStoreState) => state)
  const {setPeople, initialPeopleState, resetFilterButton, setResetFilterButton} = usePeopleStore((state: usePeoplesStoreState) => state)
  if (!resetFilterButton) return null
  
  const handleResetPeople = () => {
    setPeople(initialPeopleState)
    setResetFilterButton()
  }

  return (
    <div className="reset__filters" onClick={handleResetPeople}>
      <Chip label={filterName} className="p-mb-2" removable />
    </div>
  )
}

export default PeopleSearchFilters