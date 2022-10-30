
// libray imports
import { useEffect, useState } from 'react';
import { ScrollTop } from 'primereact/scrolltop';

// helpers & misc state imports
import { SWConstants } from "../../constants/peopleConstants";
import { usePeoplesStoreState, usePeopleStore } from '../../store/peopleStore'
import useFetch from "../../hooks/useFetch";

// crud imports
import { fetchPeople } from "../../crud/people.crud";

// component imports
import PeopleTable from './peopleTable/PeopleTable';
import PeopleTablePaginate from './peopleTable/PeopleTablePaginate';
import PeopleSearchFilters from './peopleTable/PeopleTableSearchFilters';
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
    {peopleStatus === "success" && <PeopleTable />}
    <ScrollTop threshold={0} />
  </div>
)
}

export default StarWarsPeople