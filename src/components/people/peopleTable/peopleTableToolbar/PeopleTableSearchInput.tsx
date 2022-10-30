// library import
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { useEffect, useState } from "react"

// crud imports
import { getPeopleByName } from "../../../../crud/people.crud"

// helpers & misc
import useDebounce from "../../../../hooks/useDebounce"
import { useFilterStore, useFilterStoreState } from "../../../../store/filterStore"
import { usePeoplesStoreState, usePeopleStore } from "../../../../store/peopleStore"

const PeopleTableSearchInput = () => {
  const {setPeople, setPeopleStore, initialPeopleState} = usePeopleStore((state: usePeoplesStoreState) => state)
  const {setResetFilterButton} = useFilterStore((state: useFilterStoreState) => state)
  const [searchValue, setSearchValue] = useState('')
  const debouncedSearchValue = useDebounce(searchValue, 1000)

  const handleCancelSearch = () => {
    setPeopleStore(initialPeopleState)
    setSearchValue('')
  }

  useEffect(()=> {
    const searchCharacter = async() => {
      try {
        const response = await getPeopleByName(debouncedSearchValue)
        setPeople(response.results)
        setResetFilterButton(false)
      } catch (err) {
        console.error(err)
      }
    } 

    debouncedSearchValue && debouncedSearchValue !=='' && searchCharacter()
  }, [debouncedSearchValue])

  return (
    <span className="p-float-label">
      <InputText id="search__character" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
      <label htmlFor="search__character">Character</label>
      <Button 
        onClick= {handleCancelSearch}
        icon="pi pi-times"
        className="p-button-rounded p-button-primary p-button-outlined search__character__cancel"
        aria-label="Cancel"
      />
    </span>
    )
}

export default PeopleTableSearchInput