import { MovieDTO } from '@dtos/movie'
import { apiService } from '@app/services/api'

export const useFetchMoviesToDiscoverPage = async (): Promise<
  {
    results: MovieDTO[]
  }[]
> => {
  const popularMoviesList = apiService.fetchPopularMovies()
  const popularTvShowsList = apiService.fetchTopRatedTvShows()
  const debutTvShowsList = apiService.fetchDebutTvShows()

  const moviesList = await Promise.all([
    popularMoviesList,
    popularTvShowsList,
    debutTvShowsList,
  ])

  return moviesList
}
