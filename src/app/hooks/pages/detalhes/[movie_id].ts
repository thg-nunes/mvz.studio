import { notFound } from 'next/navigation'

import { MovieDetailsDTO } from '@dtos/movie'
import { apiService } from '@app/services/api'

export const useFetchMovieDetails = async (
  movie_id: string
): Promise<{ movieDetails: MovieDetailsDTO; movieVideoKey: string }> => {
  const { results } = await apiService.fetchMovieVideoById(movie_id)

  if (!results || !results.length) {
    notFound()
  }

  const movieVideoKey = results[0].key

  const movieDetails = await apiService.fetchMovieDetailsById(movie_id)
  movieDetails.release_date = new Date(movieDetails.release_date).toLocaleDateString()
  movieDetails.popularity = parseInt(movieDetails.popularity.toFixed(0))
  movieDetails.vote_average = parseInt(movieDetails.vote_average.toFixed(0))

  return { movieDetails, movieVideoKey }
}
