// library imports
import { Dispatch } from "react"

// component imports
import PeopleSearchFilters from "./NavigationSearchFilters"
import PeopleTableToolbar from "../people/peopleTable/peopleTableToolbar/PeopleTableToolbar"

// image imports
import SWLogo from '../../assets/sw-logo.svg'

type NavigationProps = {
  setPage: Dispatch<React.SetStateAction<number>>
}

const Navigation = ({setPage}: NavigationProps ) => {
return (
  <nav className="navigation">
  <div className="navigation__image-container">
    <img className="app__starwars-logo" src={SWLogo}/>
  </div>
  <PeopleSearchFilters />
  <PeopleTableToolbar setPage={setPage} />
</nav>
)
}

export default Navigation