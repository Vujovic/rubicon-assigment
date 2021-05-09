import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { SearchContext } from './hooks/createContext'
import CategoryPage from './templates/CategoryPage/CategoryPage'
import DetailedView from './templates/DetailedView/DetailedView'

function App() {
  const [search, setSearch] = useState<string>('')

  return (
    <div className='App'>
      <SearchContext.Provider value={{ search, setSearch }}>
        <Router>
          <Switch>
            <Route exact path='/'>
              <Redirect to='/tv' />
            </Route>
            <Route exact path='/movie'>
              <CategoryPage category='movie' />
            </Route>
            <Route exact path='/tv'>
              <CategoryPage category='tv' />
            </Route>
            <Route path='/movie/:id'>
              <DetailedView type='movie' />
            </Route>
            <Route path='/tv/:id'>
              <DetailedView type='tv' />
            </Route>
          </Switch>
        </Router>
      </SearchContext.Provider>
    </div>
  )
}

export default App
