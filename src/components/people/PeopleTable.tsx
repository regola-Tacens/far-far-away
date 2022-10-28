// library imports
import { Accordion, AccordionTab } from 'primereact/accordion';
import { usePeoplesStoreState, usePeopleStore } from '../../store/peopleStore';

// component imports
import PeopleDetail from './PeopleDetail';

const PeopleTable = () => {
  const {peopleStore} = usePeopleStore((state: usePeoplesStoreState) => state)

  return (
    <div>
       <Accordion activeIndex={-1} className="people__accordion">
        { 
          peopleStore?.results?.map(people => (
            <AccordionTab header={people.name} key={people.name}>
              <PeopleDetail people={people}/>
            </AccordionTab>
          ))
        }
      </Accordion>
    </div>
  )
}

export default PeopleTable