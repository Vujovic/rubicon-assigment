import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import './DetailedView.css'

interface Params {
  id: string
}

interface Detail {
  title?: string
  name?: string
  video: boolean
  backdrop_path: string
  overview: string
}

interface Props {
  type: string
}

const DetailedView = (props: Props) => {
  const { id }: Params = useParams()
  let history = useHistory()

  const handleClick = () => {
    history.push(props.type === 'movie' ? '/movie' : '/tv')
  }

  const [detail, setDetail] = useState<Detail>({
    title: '',
    name: '',
    video: false,
    backdrop_path: '',
    overview: '',
  })

  useEffect(() => {
    const fetchDetail = async () => {
      const getDetail = await fetch(
        `https://api.themoviedb.org/3/${props.type}/${id}?api_key=567e5daa22b7cda90ab12ee130a50a4f`
      )
      const detailObj = await getDetail.json()

      setDetail(detailObj)
    }

    fetchDetail()
  }, [id, props.type])

  return (
    <div className='detailedView'>
      <button className='back' type='button' onClick={handleClick}>
        {'< Back'}
      </button>
      <div className='detail'>
        <img
          src={
            detail.backdrop_path
              ? `https://image.tmdb.org/t/p/w1280/${detail.backdrop_path}`
              : '/images/placeholder-large.jpg'
          }
          alt={`${detail.title ? detail.title : detail.name} poster`}
        />
        <h1>{detail.title ? detail.title : detail.name}</h1>
        <p>{detail.overview}</p>
      </div>
    </div>
  )
}

export default DetailedView
