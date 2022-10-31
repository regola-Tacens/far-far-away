// library imports
import { Badge } from "primereact/badge"
import { Chip } from "primereact/chip"
import { motion } from "framer-motion";

// store imports
import { useFilterStore, useFilterStoreState } from "../../store/filterStore"
import { usePeoplesStoreState, usePeopleStore } from "../../store/peopleStore"

const NavigationSearchFilters = () => {
  const {peopleStore, setPeopleStore, initialPeopleState} = usePeopleStore((state: usePeoplesStoreState) => state)
  const {filterType, filterName, resetFilterButton, setResetFilterButton, setSearchValue} = useFilterStore((state: useFilterStoreState) => state)

  if (!resetFilterButton) return null
  const peopleQuantity = peopleStore?.results?.length

  const handleResetPeople = () => {
    setPeopleStore(initialPeopleState)
    setResetFilterButton(false)
    setSearchValue('')
  }

  return (
    <motion.div 
      className="search__filters" 
      onClick={handleResetPeople}
      initial={{x: -15}}
      animate={{x: 0}}
      transition={{ 
        type: "spring",
        stiffness: 400,
        damping: 10
      }}
    >
      <Badge 
        className="search__filters__badge" 
        value={peopleQuantity} 
        severity="success"
      />
      <Chip 
        className="search__filters__chip" 
        label={`${filterType.toUpperCase()}:  ${filterName}`} 
        removable 
      />
    </motion.div>
  )
}

export default NavigationSearchFilters