import { fetchData } from './fetch-data-config'

import { CarouselMoviePropsDTO, MovieDTO, MovieDetailsDTO } from '@dtos/movie'

type ApiService = {
  fetchCarouselMovies(): Promise<CarouselMoviePropsDTO[]>
  fetchMoviesByGenre(data: { genreID: number; page: number }): Promise<MovieDTO[]>
  fetchMovieDetailsById(movieId: string): Promise<MovieDetailsDTO>
  fetchMovieVideoById(movieId: string): Promise<{ results: { key: string }[] }>
  fetchMoviesById(moviesId: number[]): Promise<{ results: MovieDetailsDTO[] }>
  fetchPopularMovies(): Promise<{ results: MovieDTO[] }>
  fetchTopRatedTvShows(): Promise<{ results: MovieDTO[] }>
  fetchDebutTvShows(): Promise<{ results: MovieDTO[] }>
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
  fetchMoviesById: async function (
    moviesId: number[]
  ): Promise<{ results: MovieDetailsDTO[] }> {
    const moviesRequestConfig = moviesId.map((id) => {
      return fetchData<MovieDetailsDTO>(`/movie/${id}`, {
        next: {
          revalidate: 60 * 60 * 24 * 3, // 3 days
        },
      })
    })

    const response = await Promise.all(moviesRequestConfig)

    return {
      results: response,
    }
  },
  fetchPopularMovies: async function (): Promise<{ results: MovieDTO[] }> {
    const { results } = await fetchData<{ results: MovieDTO[] }>(`/movie/popular`, {
      next: {
        revalidate: 60 * 60 * 24 * 3, // 3 days
      },
    })

    return {
      results,
    }
  },
  fetchTopRatedTvShows: async function (): Promise<{ results: MovieDTO[] }> {
    const { results } = await fetchData<{ results: MovieDTO[] }>(`/tv/top_rated`, {
      next: {
        revalidate: 60 * 60 * 24 * 3, // 3 days
      },
    })

    return {
      results,
    }
  },
  fetchDebutTvShows: async function (): Promise<{ results: MovieDTO[] }> {
    const { results } = await fetchData<{ results: MovieDTO[] }>(`/tv/airing_today`, {
      next: {
        revalidate: 60 * 60 * 24 * 3, // 3 days
      },
    })

    return {
      results,
    }
  },
}

export { apiService }
