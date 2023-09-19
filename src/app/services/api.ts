import { fetchData } from './fetch-data-config'

import { CarouselMoviePropsDTO, MovieDTO } from '@dtos/movie'

type ApiService = {
  fetchCarouselMovies(): Promise<CarouselMoviePropsDTO[]>
  fetchPopularMovies(): Promise<MovieDTO[]>
  fetchMoviesByGenre(data: { genreID: number; page: number }): Promise<MovieDTO[]>
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
  fetchPopularMovies: async function (): Promise<MovieDTO[]> {
    const { results } = await fetchData<{ results: MovieDTO[] }>('/movie/popular', {
      next: {
        revalidate: 60 * 60 * 24 * 3, // 3 days
      },
    })

    return results
  },
}

export { apiService }
