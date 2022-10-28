// library imports
import {useQuery} from 'react-query';

type useFetchProps = {
  queryRepo: string,
  apiCall: Promise<any>
}

const useFetch = ({queryRepo, apiCall}: useFetchProps) => {
  return useQuery(queryRepo, async() => await apiCall)
}
export default useFetch;
