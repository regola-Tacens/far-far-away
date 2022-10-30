// library imports
import { Accordion, AccordionTab } from 'primereact/accordion';

// helpers & store imports
import { usePeoplesStoreState, usePeopleStore } from '../../../store/peopleStore';

// component imports
import PeopleDetail from './peopleTableDetail/PeopleDetail';

const PeopleTable = () => {
  const {peopleStore, activeIndex} = usePeopleStore((state: usePeoplesStoreState) => state)
  
  return (
    <div className="people__accordion">
       <Accordion activeIndex={activeIndex}>
        { 
          peopleStore?.results?.map(people => (
            <AccordionTab header={<h3>{people.name}</h3>} key={people.name}>
              <PeopleDetail people={people}/>
            </AccordionTab>
          ))
        }
      </Accordion>
    </div>
  )
}

export default PeopleTable