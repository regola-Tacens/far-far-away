
// libray imports
import { useEffect } from 'react';

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
  const {setPeople, setInitialPeople} = usePeopleStore((state: usePeoplesStoreState) => state)
  const {data: peopleData, error: peopleError, status: peopleStatus } = useFetch({
    queryRepo: SWConstants.PEOPLE,
    apiCall: fetchPeople(),
    param: true
  });
  
  useEffect(() => {
    if(peopleStatus === 'success') {
      setPeople(peopleData)
      setInitialPeople(peopleData)
    } 
  }, [peopleStatus])

return (
  <div className="starwars__container">
    <nav className="navigation">
      <PeopleSearchFilters />
      <PeopleTablePaginate />
    </nav>
    <Spinner loading={peopleStatus} />
    <PeopleTable />
  </div>
)
}

export default StarWarsPeople