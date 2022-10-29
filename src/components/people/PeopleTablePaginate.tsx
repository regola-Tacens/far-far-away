// library import
import { useMemo } from "react"

// crud import
import { getPeople } from "../../crud/people.crud"

// component imports
import {Button} from 'primereact/button'
import { Chip } from 'primereact/chip';

// store imports
import { usePeoplesStoreState, usePeopleStore } from "../../store/peopleStore"
import { useFilterStore, useFilterStoreState } from "../../store/filterStore";

const PeopleTablePaginate = () => {
  const {peopleStore, setPeople} = usePeopleStore((state: usePeoplesStoreState) => state)
  const {setResetFilterButton} = useFilterStore((state: useFilterStoreState) => state)

  const nextPage = useMemo(() => {
    return peopleStore.next && peopleStore.next?.charAt(peopleStore.next.length - 1)
  }, [peopleStore])

  const previousPage = useMemo(() => {
    return peopleStore.previous && peopleStore.previous?.charAt(peopleStore.previous.length - 1)
  }, [peopleStore])

  const currentPage = () => {
    if(nextPage) {
      return Number(nextPage) - 1
    } else {
      return Number(previousPage) + 1
    }
  }
  const pageDirection = {
    nextPage: nextPage,
    previousPage: previousPage
  }

  const handleChangePage = async(direction: 'previousPage' |'nextPage') => {
    try {
      if (pageDirection[direction] !== null ){
        const peopleUpdated =  await getPeople(Number(pageDirection[direction]))
        setPeople(peopleUpdated)
        setResetFilterButton(false)
      }
    } catch (err) {
      console.error(err)
    }
  }

return (
  <div className="paginate">
    <div className="paginate__page">
      <Chip label={`Page: ${currentPage()}`} className="mr-2 mb-2 custom-chip" />
    </div>
    <div className="paginate__buttons">
      <Button 
        className="peoplePaginate_next" 
        onClick={() => handleChangePage('previousPage')}
        disabled={!previousPage}
      >
        previous
      </Button>
      <Button 
        className="peoplePaginate_previous"
        onClick={() => handleChangePage('nextPage')}
        disabled={!nextPage}
      >
        next
      </Button>
    </div>
  </div>
)
}

export default PeopleTablePaginate