// library imports
import { Dispatch } from "react"
import { motion } from "framer-motion";

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
    <motion.div 
      className="navigation__image-container"
      initial={{y: -100, opacity: 0}}
      animate={{y: 20, opacity: 1}}
      transition={{
        delay:0.5,
        duration: 0.8,
        ease: [0, 0.71, 0.2, 1.01]
      }}
    >
      <img className="app__starwars-logo" src={SWLogo}/>
    </motion.div>
    <PeopleSearchFilters />
    <PeopleTableToolbar setPage={setPage} />
  </nav>
)
}

export default Navigation