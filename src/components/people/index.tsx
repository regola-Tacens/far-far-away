
// libray imports
import { useEffect, useState } from 'react';

// helpers & misc state imports
import { SWConstants } from "../../constants/peopleConstants";
import { usePeoplesStoreState, usePeopleStore } from '../../store/peopleStore'
import useFetch from "../../hooks/useFetch";

// crud imports
import { fetchPeople } from "../../crud/people.crud";

// component imports
import PeopleTable from './PeopleTable';
import PeopleTablePaginate from './PeopleTablePaginate';
import PeopleSearchFilters from './PeopleSearchFilters';
import Spinner from '../UI/Spinner';

const StarWarsPeople = () => {
  const {setPeopleStore, setInitialPeople} = usePeopleStore((state: usePeoplesStoreState) => state)
  const [page, setPage] = useState(1)
  const {data: peopleData, error: peopleError, status: peopleStatus } = useFetch({
    queryRepo: `${SWConstants.PEOPLE}-page${page}`,
    apiCall: fetchPeople(page),
    param: true
  });
  
  useEffect(() => {
    if(peopleStatus === 'success') {
      setPeopleStore(peopleData)
      setInitialPeople(peopleData)
    } 
  }, [peopleStatus, peopleData])

return (
  <div className="starwars__container">
    <nav className="navigation">
      <PeopleSearchFilters />
      <PeopleTablePaginate setPage={setPage} />
    </nav>
    <Spinner loading={peopleStatus} />
    <PeopleTable />
  </div>
)
}

export default StarWarsPeople