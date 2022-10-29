import create from 'zustand'

export type useFilterStoreState = {
  filterType: string,
  filterName: string,
  setFilterName: (filterType: string, filterName: string) => void,
  resetFilterButton: boolean,
  setResetFilterButton: (isFilterTrue: boolean) => void,
}

export const useFilterStore = create<useFilterStoreState>((set) => ({
  filterType: '',
  filterName: '',
  resetFilterButton: false,
  setResetFilterButton: (isFilterTrue: boolean) => set((state) =>({
    resetFilterButton: isFilterTrue,
  })),
  setFilterName: (filterType: string, filterName: string) => set((state) => ({
    filterType: filterType,
    filterName: filterName
  }))
}))