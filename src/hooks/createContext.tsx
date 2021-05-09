import { createContext, useContext } from 'react'

export type GlobalContext = {
  search: string
  setSearch: (c: string) => void
}

export const SearchContext = createContext<GlobalContext>({
  search: '',
  setSearch: () => {},
})

export const useGlobalContext = () => useContext(SearchContext)
