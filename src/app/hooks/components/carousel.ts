import { useState, useEffect } from 'react'

import { CarouselMoviePropsDTO, MovieDTO } from '@dtos/movie'
import { fetchData } from '@app/services/fetch-data-config'

const useFetchMoviesCarouseslList = () => {
  const [movies, setMovies] = useState<CarouselMoviePropsDTO[]>([])

  useEffect(() => {
    async function fetchMovies() {
      const { results } = await fetchData<{ results: MovieDTO[] }>('/discover/movie', {
        next: {
          revalidate: 60 * 60 * 24 * 3, // 3 days
        },
      })
      const movieCarouselList: CarouselMoviePropsDTO[] = results
        .slice(0, 5)
        .map(({ id, title, poster_path, overview }) => {
          return {
            id,
            title,
            poster_path,
            overview: overview.slice(0, 149) + '...',
          }
        })
      setMovies(movieCarouselList)
    }

    fetchMovies()
  }, [])

  return { movies }
}

export { useFetchMoviesCarouseslList }
