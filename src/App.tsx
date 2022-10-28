import { QueryClient, QueryClientProvider } from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools';
import StarWarsPeople from './components/people';

function App() {
  const queryClient = new QueryClient();

  return (
    <div className='app'>
      <QueryClientProvider client={queryClient}>
        <StarWarsPeople />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
    
  )
}

export default App
