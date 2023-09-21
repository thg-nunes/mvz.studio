import { apiService } from '@app/services/api'
import { MovieDetailsDTO } from '@dtos/movie'

export const useFetchMovieDetails = async (
  movie_id: string
): Promise<{ movieDetails: MovieDetailsDTO; movieVideoKey: string }> => {
  const { results } = await apiService.fetchMovieVideoById(movie_id)
  const movieVideoKey = results[0].key

  const movieDetails = await apiService.fetchMovieDetailsById(movie_id)
  movieDetails.release_date = new Date(movieDetails.release_date).toLocaleDateString()
  movieDetails.popularity = parseInt(movieDetails.popularity.toFixed(0))
  movieDetails.popularity = parseInt(movieDetails.popularity.toFixed(0))
  movieDetails.vote_average = parseInt(movieDetails.vote_average.toFixed(0))

  return { movieDetails, movieVideoKey }
}
