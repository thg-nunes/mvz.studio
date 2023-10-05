import { convertTvShowListToMovieDTOList } from '@utils/convertTvShowListToMovieDTOList'
import { api_key, baseURL, fetchData } from './fetch-data-config'

import {
  CarouselMoviePropsDTO,
  MovieDTO,
  MovieDetailsDTO,
  SerieSeasonsDTO,
  SimilarTvShowCardDTO,
  TVSeasonDetailsDTO,
  TVSerieDetails,
  TVSerieImaesDTO,
  TopRatedTVShowsPropsDTO,
} from '@dtos/movie'
import { SeasonDetailsPageParams } from '@app/(pages)/detalhes/tv/[tv_serie_id]/season/[season_number]/page'

type ApiService = {
  fetchCarouselMovies(): Promise<CarouselMoviePropsDTO[]>
  fetchMoviesByGenre(data: { genreID: number; page: number }): Promise<MovieDTO[]>
  fetchMovieDetailsById(movieId: string): Promise<MovieDetailsDTO>
  fetchMovieVideoById(movieId: string): Promise<{ results: { key: string }[] }>
  fetchMoviesById(moviesId: number[]): Promise<{ results: MovieDetailsDTO[] }>
  fetchPopularMovies(): Promise<{ results: MovieDTO[] }>
  fetchTopRatedTvShows(): Promise<{ results: MovieDTO[] }>
  fetchDebutTvShows(): Promise<{ results: MovieDTO[] }>
  fetchTvShowDetails(tvSerieId: string): Promise<TVSerieDetails>
  fetchSimilarTvShow(tvSerieId: string): Promise<SimilarTvShowCardDTO[]>
  fetchTvShowImages(tvSerieId: string): Promise<{ backdrops: TVSerieImaesDTO }>
  fetchSerieSeason(season_number: string): Promise<SerieSeasonsDTO[]>
  fetchTVSeasonDetails(data: SeasonDetailsPageParams): Promise<TVSeasonDetailsDTO>
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
    const { results } = await fetchData<{ results: TopRatedTVShowsPropsDTO[] }>(
      `/tv/top_rated`,
      {
        next: {
          revalidate: 60 * 60 * 24 * 3, // 3 days
        },
      }
    )

    const listUpdated = convertTvShowListToMovieDTOList(results)

    return {
      results: listUpdated,
    }
  },
  fetchDebutTvShows: async function (): Promise<{ results: MovieDTO[] }> {
    const { results } = await fetchData<{ results: TopRatedTVShowsPropsDTO[] }>(
      `/tv/airing_today`,
      {
        next: {
          revalidate: 60 * 60 * 24 * 3, // 3 days
        },
      }
    )

    const listUpdated = convertTvShowListToMovieDTOList(results)

    return {
      results: listUpdated,
    }
  },
  fetchTvShowDetails: async function (tvSerieId: string): Promise<TVSerieDetails> {
    const movieDetails = await fetchData<TVSerieDetails>(`/tv/${tvSerieId}`, {
      next: {
        revalidate: 60 * 60 * 24 * 3, // 3 days
      },
    })

    return movieDetails
  },
  fetchSimilarTvShow: async function (
    tvSerieId: string
  ): Promise<SimilarTvShowCardDTO[]> {
    const { results } = await fetchData<{ results: SimilarTvShowCardDTO[] }>(
      `/tv/${tvSerieId}/similar`,
      {
        next: {
          revalidate: 60 * 60 * 24 * 3, // 3 days
        },
      }
    )

    return results
  },
  fetchTvShowImages: async function (
    tvSerieId: string
  ): Promise<{ backdrops: TVSerieImaesDTO }> {
    const response = await fetch(
      `${baseURL}/tv/${tvSerieId}/images?&api_key=${api_key}`,
      {
        next: {
          revalidate: 60 * 60 * 24 * 3, // 3 days
        },
      }
    )
    const data: { backdrops: TVSerieImaesDTO } = await response.json()

    return data
  },
  fetchSerieSeason: async function (serie_id: string): Promise<SerieSeasonsDTO[]> {
    const { seasons } = await fetchData<{ seasons: SerieSeasonsDTO[] }>(
      `/tv/${serie_id}`,
      {
        next: {
          revalidate: 60 * 60 * 24 * 3, // 3 days
        },
      },
      'append_to_response=seasons'
    )

    return seasons
  },
  fetchTVSeasonDetails: async function ({
    params: { season_number, tv_serie_id },
  }: SeasonDetailsPageParams): Promise<TVSeasonDetailsDTO> {
    const response = await fetchData<TVSeasonDetailsDTO>(
      `/tv/${tv_serie_id}/season/${season_number}`,
      {
        next: {
          revalidate: 60 * 60 * 24 * 3, // 3 days
        },
      }
    )

    return response
  },
}

export { apiService }
