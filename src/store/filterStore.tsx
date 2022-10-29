import create from 'zustand'

export type useFilterStoreState = {
  filterName: string,
  setFilterName: (filterName: string) => void,
  resetFilterButton: boolean,
  setResetFilterButton: (isFilterTrue: boolean) => void,
}

export const useFilterStore = create<useFilterStoreState>((set) => ({
  filterName: '',
  resetFilterButton: false,
  setResetFilterButton: (isFilterTrue: boolean) => set((state) =>({
    resetFilterButton: isFilterTrue,
  })),
  setFilterName: (filterName: string) => set((state) => ({
    filterName: filterName
  }))
}))