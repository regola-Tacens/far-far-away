import { QueryClient, QueryClientProvider } from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools';
import StarWarsPeople from './components/people';
import SWLogo from './assets/sw-logo.svg'
import './App.css'

function App() {
  const queryClient = new QueryClient();

  return (
    <div className='app'>
      <QueryClientProvider client={queryClient}>
        <img className="app__starwars-logo" src={SWLogo}/>
        <StarWarsPeople />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  )
}

export default App
