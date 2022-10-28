// library imports
import {ProgressSpinner} from 'primereact/progressspinner'

// style imports
import '../../styles/uiComponents.css'

type SpinnerProps = {
  loading: 'error' | 'idle' | 'loading' | 'success'
}

const Spinner = ({loading}: SpinnerProps) => {
  return (
    <div className='spinner'>
      {loading ==='loading' && <ProgressSpinner style={{width: '40px'}} strokeWidth='5px' />}
    </div>
  )
}

export default Spinner