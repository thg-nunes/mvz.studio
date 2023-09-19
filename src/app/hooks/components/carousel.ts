import { useState, useEffect } from 'react'

import { CarouselMoviePropsDTO } from '@dtos/movie'
import { apiService } from '@app/services/api'

const useFetchCarouselMoviesCarouseslList = () => {
  const [movies, setMovies] = useState<CarouselMoviePropsDTO[]>([])

  useEffect(() => {
    async function fetchMovies() {
      const movies = await apiService.fetchCarouselMovies()
      setMovies(movies)
    }

    fetchMovies()
  }, [])

  return { movies }
}

export { useFetchCarouselMoviesCarouseslList }
