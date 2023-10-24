import { convertTvShowListToMovieDTOList } from '@utils/convertTvShowListToMovieDTOList'
import { api_key, baseURL, fetchData } from './fetch-data-config'

import * as DTOs from '@dtos/movie'
import { SeasonDetailsPageParams } from '@app/(pages)/detalhes/tv/[tv_serie_id]/season/[season_number]/page'

type ApiService = {
  fetchCarouselMovies(): Promise<DTOs.CarouselMoviePropsDTO[]>
  fetchMoviesByGenre(data: { genreID: number; page: number }): Promise<DTOs.MovieDTO[]>
  fetchMovieDetailsById(movieId: string): Promise<DTOs.MovieDetailsDTO>
  fetchMovieVideoById(movieId: string): Promise<{ results: { key: string }[] }>
  fetchMoviesById(moviesId: number[]): Promise<{ results: DTOs.MovieDetailsDTO[] }>
  fetchPopularMovies(): Promise<{ results: DTOs.MovieDTO[] }>
  fetchTopRatedTvShows(): Promise<{ results: DTOs.MovieDTO[] }>
  fetchDebutTvShows(): Promise<{ results: DTOs.MovieDTO[] }>
  fetchTvShowDetails(tvSerieId: string): Promise<DTOs.TVSerieDetails>
  fetchSimilarTvShow(tvSerieId: string): Promise<DTOs.SimilarTvShowCardDTO[]>
  fetchTvShowImages(tvSerieId: string): Promise<{ backdrops: DTOs.TVSerieImaesDTO }>
  fetchSerieSeason(season_number: string): Promise<DTOs.SerieSeasonsDTO[]>
  fetchTVSeasonEpisodeDetails(
    params: DTOs.TVSeasonEpisodeDetailsDTO
  ): Promise<DTOs.SeasonEpisodeDetailsDTO>
  fetchTVSeasonEpisodeImages(
    params: DTOs.TVSeasonEpisodeDetailsDTO
  ): Promise<DTOs.TVSeasonEpisodeImagesDTO>
  fetchTVSeasonDetails(data: SeasonDetailsPageParams): Promise<DTOs.TVSeasonDetailsDTO>
}

const apiService: ApiService = {
  fetchCarouselMovies: async function (): Promise<DTOs.CarouselMoviePropsDTO[]> {
    const { results } = await fetchData<{ results: DTOs.MovieDTO[] }>('/discover/movie', {
      next: {
        revalidate: 60 * 60 * 24 * 3, // 3 days
      },
    })

    const movieCarouselList: DTOs.CarouselMoviePropsDTO[] = results
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
  }): Promise<DTOs.MovieDTO[]> {
    const { results } = await fetchData<{ results: DTOs.MovieDTO[] }>(
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
  fetchMovieDetailsById: async function (movieId: string): Promise<DTOs.MovieDetailsDTO> {
    const movieDetails = await fetchData<DTOs.MovieDetailsDTO>(`/movie/${movieId}`, {
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
  ): Promise<{ results: DTOs.MovieDetailsDTO[] }> {
    const moviesRequestConfig = moviesId.map((id) => {
      return fetchData<DTOs.MovieDetailsDTO>(`/movie/${id}`, {
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
  fetchPopularMovies: async function (): Promise<{ results: DTOs.MovieDTO[] }> {
    const { results } = await fetchData<{ results: DTOs.MovieDTO[] }>(`/movie/popular`, {
      next: {
        revalidate: 60 * 60 * 24 * 3, // 3 days
      },
    })

    return {
      results,
    }
  },
  fetchTopRatedTvShows: async function (): Promise<{ results: DTOs.MovieDTO[] }> {
    const { results } = await fetchData<{ results: DTOs.TopRatedTVShowsPropsDTO[] }>(
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
  fetchDebutTvShows: async function (): Promise<{ results: DTOs.MovieDTO[] }> {
    const { results } = await fetchData<{ results: DTOs.TopRatedTVShowsPropsDTO[] }>(
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
  fetchTvShowDetails: async function (tvSerieId: string): Promise<DTOs.TVSerieDetails> {
    const movieDetails = await fetchData<DTOs.TVSerieDetails>(`/tv/${tvSerieId}`, {
      next: {
        revalidate: 60 * 60 * 24 * 3, // 3 days
      },
    })

    return movieDetails
  },
  fetchSimilarTvShow: async function (
    tvSerieId: string
  ): Promise<DTOs.SimilarTvShowCardDTO[]> {
    const { results } = await fetchData<{ results: DTOs.SimilarTvShowCardDTO[] }>(
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
  ): Promise<{ backdrops: DTOs.TVSerieImaesDTO }> {
    const response = await fetch(
      `${baseURL}/tv/${tvSerieId}/images?&api_key=${api_key}`,
      {
        next: {
          revalidate: 60 * 60 * 24 * 3, // 3 days
        },
      }
    )
    const data: { backdrops: DTOs.TVSerieImaesDTO } = await response.json()

    return data
  },
  fetchSerieSeason: async function (serie_id: string): Promise<DTOs.SerieSeasonsDTO[]> {
    const { seasons } = await fetchData<{ seasons: DTOs.SerieSeasonsDTO[] }>(
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
  }: SeasonDetailsPageParams): Promise<DTOs.TVSeasonDetailsDTO> {
    const response = await fetchData<DTOs.TVSeasonDetailsDTO>(
      `/tv/${tv_serie_id}/season/${season_number}`,
      {
        next: {
          revalidate: 60 * 60 * 24 * 3, // 3 days
        },
      }
    )

    return response
  },
  fetchTVSeasonEpisodeDetails: async function (
    params: DTOs.TVSeasonEpisodeDetailsDTO
  ): Promise<DTOs.SeasonEpisodeDetailsDTO> {
    const response = await fetchData<DTOs.SeasonEpisodeDetailsDTO>(
      `/tv/${params.tv_serie_id}/season/${params.season_number}/episode/${params.episode_number}`,
      {
        next: {
          revalidate: 60 * 60 * 24 * 3, // 3 days
        },
      }
    )

    return response
  },
  fetchTVSeasonEpisodeImages: async function (
    params: DTOs.TVSeasonEpisodeDetailsDTO
  ): Promise<DTOs.TVSeasonEpisodeImagesDTO> {
    const response = await fetchData<DTOs.TVSeasonEpisodeImagesDTO>(
      `/tv/${params.tv_serie_id}/season/${params.season_number}/episode/${params.episode_number}/images`,
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
