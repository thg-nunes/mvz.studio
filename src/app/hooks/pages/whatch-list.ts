import { apiService } from '@app/services/api'
import { MovieDetailsDTO } from '@dtos/movie'
import { useEffect, useState } from 'react'

export const useGetMoviesById = ({
  moviesId,
}: {
  moviesId: number[]
}): MovieDetailsDTO[] => {
  const [moviesDetails, setMoviesDetails] = useState<MovieDetailsDTO[]>([])

  useEffect(() => {
    async function fetchMoviesDetails() {
      const { results } = await apiService.fetchMoviesById(moviesId)
      setMoviesDetails(results)
    }

    fetchMoviesDetails()
  }, [])

  return moviesDetails
}
