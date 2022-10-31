import create from 'zustand'

export type useFilterStoreState = {
  filterType: string,
  filterName: string,
  searchValue: string,
  setSearchValue: (value: string) => void
  setFilterName: (filterType: string, filterName: string) => void,
  resetFilterButton: boolean,
  setResetFilterButton: (isFilterTrue: boolean) => void,
}

export const useFilterStore = create<useFilterStoreState>((set) => ({
  filterType: '',
  filterName: '',
  searchValue: '',
  resetFilterButton: false,
  setResetFilterButton: (isFilterTrue: boolean) => set((state) =>({
    resetFilterButton: isFilterTrue,
  })),
  setFilterName: (filterType: string, filterName: string) => set((state) => ({
    filterType: filterType,
    filterName: filterName
  })),
  setSearchValue: (value: string) => set((state) => ({
    searchValue: value
  }))
}))