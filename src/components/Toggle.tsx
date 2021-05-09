import { Link } from 'react-router-dom'

import './Toggle.css'

const Toggle = (props: { location: string }) => {
  return (
    <div className='toggle'>
      <Link
        to='/movie'
        className={
          props.location === '/movie' ? 'toggleButton active' : 'toggleButton'
        }
      >
        Movies
      </Link>
      <Link
        to='/tv'
        className={
          props.location === '/tv' ? 'toggleButton active' : 'toggleButton'
        }
      >
        TV Shows
      </Link>
    </div>
  )
}

export default Toggle
