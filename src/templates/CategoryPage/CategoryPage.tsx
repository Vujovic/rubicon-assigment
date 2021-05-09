import { useEffect, useState } from 'react'
import { useGlobalContext } from '../../hooks/createContext'
import { Link, useLocation } from 'react-router-dom'

import Toggle from '../../components/Toggle'
import './CategoryPage.css'

interface IProps {
  category: string
}

interface ICategoryList {
  results: Array<ICategoryArray>
}

interface ICategoryArray {
  id: string
  title?: string
  name?: string
  backdrop_path: string
}

const CategoryPage = (props: IProps) => {
  const url = `https://api.themoviedb.org/3/${props.category}/top_rated?api_key=567e5daa22b7cda90ab12ee130a50a4f`
  const location = useLocation()

  const [list, setList] = useState<ICategoryList>({ results: [] })
  const [searchResults, setSearchResults] = useState<ICategoryList>({
    results: [],
  })
  const { search, setSearch } = useGlobalContext()

  const handleSearchInputChanges = (e: any) => {
    setSearch(e.target.value)
    console.log(search)
  }

  useEffect(() => {
    const fetchList = async () => {
      const getList = await fetch(url)
      const listArr = await getList.json()

      setList(listArr)
    }

    fetchList()

    if (search.length >= 3) {
      const fetchSearchResults = async () => {
        const getResults = await fetch(
          `https://api.themoviedb.org/3/search/${props.category}?api_key=567e5daa22b7cda90ab12ee130a50a4f&query=${search}`
        )
        const resultsArr = await getResults.json()

        setSearchResults(resultsArr)
      }

      fetchSearchResults()
    }
  }, [search, props.category, url])

  return (
    <div className='container'>
      <Toggle location={location.pathname} />
      <form className='searchForm'>
        <input
          className='search'
          value={search}
          onChange={handleSearchInputChanges}
          type='text'
          placeholder='🔎︎ Search'
        />
      </form>
      <h1 className='textCenter'>
        {props.category === 'movie' ? 'Movies' : 'TV Shows'}
      </h1>
      {search.length < 3 && (
        <div className='list'>
          {list.results.slice(0, 10).map(item => (
            <Link
              to={`${props.category}/${item.id}`}
              key={item.id}
              className='card'
            >
              <img
                src={
                  item.backdrop_path
                    ? `https://image.tmdb.org/t/p/w400/${item.backdrop_path}`
                    : `/images/placeholder.jpg`
                }
                alt={`${item.title} poster`}
              />
              <h2>{item.title ? item.title : item.name}</h2>
            </Link>
          ))}
        </div>
      )}
      {search.length >= 3 && (
        <div className='list'>
          {searchResults.results.map(item => (
            <Link
              to={`${props.category}/${item.id}`}
              key={item.id}
              className='card'
            >
              <img
                src={
                  item.backdrop_path
                    ? `https://image.tmdb.org/t/p/w400/${item.backdrop_path}`
                    : `/images/placeholder.jpg`
                }
                alt={`${item.title} poster`}
              />
              <h2>{item.title ? item.title : item.name}</h2>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoryPage
