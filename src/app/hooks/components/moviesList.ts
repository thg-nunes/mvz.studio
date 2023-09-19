import { useEffect, useState } from 'react'

import { MovieDTO } from '@dtos/movie'
import { apiService } from '@app/services/api'

const useFetchMoviesByGenre = (genreID: number, page: number): MovieDTO[] => {
  const [movieList, setMovieList] = useState<MovieDTO[]>([])

  useEffect(() => {
    async function fetchMoviesList() {
      const response = await apiService.fetchMoviesByGenre({ genreID, page })

      setMovieList(response)
    }

    fetchMoviesList()
  }, [page])

  return movieList
}

export { useFetchMoviesByGenre }
