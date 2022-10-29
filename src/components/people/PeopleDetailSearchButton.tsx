// library imports
import { Button } from "primereact/button"

type PeopleDetailSearchButtonsProps = {
  label: string, 
  labelName: any, 
  handleCallback: () => void
}

const PeopleDetailSearchButtons = ({label, labelName, handleCallback}: PeopleDetailSearchButtonsProps) => {
  return (
  <div className="flex">
    <div>
      <div className="peopledetail__filterbtn">{label} {labelName}</div>
    </div>
    <Button 
      className="p-button-rounded p-button-success p-button-outlined"
      onClick={handleCallback} 
      icon="pi pi-filter" 
    />
  </div>
  )
}

export default PeopleDetailSearchButtons