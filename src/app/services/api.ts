import { fetchData } from './fetch-data-config'

import { CarouselMoviePropsDTO, MovieDTO, MovieDetailsDTO } from '@dtos/movie'

type ApiService = {
  fetchCarouselMovies(): Promise<CarouselMoviePropsDTO[]>
  fetchMoviesByGenre(data: { genreID: number; page: number }): Promise<MovieDTO[]>
  fetchMovieDetailsById(movieId: string): Promise<MovieDetailsDTO>
  fetchMovieVideoById(movieId: string): Promise<{ results: { key: string }[] }>
}

const apiService: ApiService = {
  fetchCarouselMovies: async function (): Promise<CarouselMoviePropsDTO[]> {
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

    return movieCarouselList
  },
  fetchMoviesByGenre: async function ({
    page = 1,
    genreID,
  }: {
    genreID: number
    page: number
  }): Promise<MovieDTO[]> {
    const { results } = await fetchData<{ results: MovieDTO[] }>(
      `/discover/movie`,
      {
        next: {
          revalidate: 60 * 60 * 24 * 3, // 3 days
        },
      },
      `with_genres=${genreID}&page=${page}`
    )

    return results
  },
  fetchMovieDetailsById: async function (movieId: string): Promise<MovieDetailsDTO> {
    const movieDetails = await fetchData<MovieDetailsDTO>(`/movie/${movieId}`, {
      next: {
        revalidate: 60 * 60 * 24 * 3, // 3 days
      },
    })

    return movieDetails
  },
  fetchMovieVideoById: async function (
    movieId: string
  ): Promise<{ results: { key: string }[] }> {
    const movieDetails = await fetchData<{ results: { key: string }[] }>(
      `/movie/${movieId}/videos`,
      {
        next: {
          revalidate: 60 * 60 * 24 * 3, // 3 days
        },
      }
    )

    return movieDetails
  },
}

export { apiService }
