import { Chip } from "primereact/chip"
import { usePeoplesStoreState, usePeopleStore } from "../../store/peopleStore"

const PeopleSearchFilters = () => {
  const {setPeople, initialPeopleState, resetFilterButton, setResetFilterButton} = usePeopleStore((state: usePeoplesStoreState) => state)
  if (!resetFilterButton) return null
  const handleResetPeople = () => {
    setPeople(initialPeopleState)
    setResetFilterButton()
  }

  return (
    <div className="reset__filters" onClick={handleResetPeople}>
      <Chip label='reset filters' className="mr-2 mb-2 custom-chip" />
    </div>
  )
}

export default PeopleSearchFilters