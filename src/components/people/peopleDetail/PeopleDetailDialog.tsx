// library imports
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dispatch } from 'react';

type PeopleDetailDialogProps = {
  isDialogVisible: boolean,
  setDialogVisible: Dispatch<React.SetStateAction<boolean>>,
  selectedFilm: any,
  handleSearchByFilm: (film: string) => void
}

const PeopleDetailDialog = ({isDialogVisible, setDialogVisible, selectedFilm, handleSearchByFilm}: PeopleDetailDialogProps) => {

  const handleFilterClick = () => {
    handleSearchByFilm(selectedFilm.url)
    setDialogVisible(false)
  }

  return (
    <Dialog 
      header={selectedFilm.title} 
      visible={isDialogVisible} 
      position="bottom" 
      modal 
      style={{ width: '50vw' }}
      onHide={() => {setDialogVisible(false)}}
      draggable={false} resizable={false}
    >
      <p className="p-m-0">{selectedFilm.opening_crawl}</p>
      <Button 
        onClick={handleFilterClick}
        label="filter"
        icon="pi pi-filter"
        iconPos="right"
      />
    </Dialog>
)
}

export default PeopleDetailDialog