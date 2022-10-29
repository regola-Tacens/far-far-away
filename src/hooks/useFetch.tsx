// library imports
import {useQuery} from 'react-query';

type useFetchProps = {
  queryRepo: string,
  apiCall: Promise<any>,
  param: boolean 
}

const useFetch = ({queryRepo, apiCall, param}: useFetchProps) => {
  return useQuery(
    queryRepo,
    async() => await apiCall,
    {
      enabled: param,
      retry: 1
    }
  )
}
export default useFetch;
