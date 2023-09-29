import { render, screen, waitFor } from '@testing-library/react'

import { apiService } from '@app/services/api'
import MovieDetails, {
  generateMetadata,
} from '@app/(pages)/detalhes/movie/[movie_id]/page'
import { useFetchMovieDetails } from '@app/hooks/pages/detalhes/[movie_id]'

jest.mock('@app/services/api')
jest.mock('@app/hooks/pages/detalhes/[movie_id]')

describe('<MovieDetails />', () => {
  const release_date = '31-08-2023'
  const popularity = 6.951
  const vote_average = 152.04

  const movieDetails = {
    adult: true,
    backdrop_path: '/backdrop_path',
    genres: [
      {
        id: 12,
        name: 'any_genre',
      },
    ],
    id: 123,
    original_language: 'any_language',
    original_title: 'any_title',
    overview: 'any_overview',
    popularity,
    poster_path: '/any_poster_path',
    production_companies: [{ name: 'any_companie' }],
    release_date,
    runtime: 159,
    title: 'any_title',
    video: false,
    vote_average,
    vote_count: 1520,
  }

  it('Ensures that the page of movie details render the correct infors of movie and', async () => {
    const release_date = '31-08-2023'
    const popularity = 6.951
    const vote_average = 152.04

    jest.mocked(useFetchMovieDetails).mockResolvedValue({
      movieVideoKey: 'movie_video_key',
      movieDetails: {
        adult: true,
        backdrop_path: '/backdrop_path',
        genres: [
          {
            id: 12,
            name: 'any_genre',
          },
        ],
        id: 123,
        original_language: 'any_language',
        original_title: 'any_title',
        overview: 'any_overview',
        popularity,
        poster_path: '/any_poster_path',
        production_companies: [{ name: 'any_companie' }],
        release_date,
        runtime: 159,
        title: 'any_title',
        video: false,
        vote_average,
        vote_count: 1520,
      },
    })
    jest.mocked(apiService.fetchMovieVideoById).mockResolvedValue({
      results: [{ key: 'movie_video_key' }],
    })
    jest.mocked(apiService.fetchMovieDetailsById).mockResolvedValue(movieDetails)

    render(await MovieDetails({ params: { movie_id: '123' } }))

    await waitFor(() =>
      expect(screen.getByText(`Título: ${movieDetails.title}`)).toBeInTheDocument()
    )
    await waitFor(() =>
      expect(screen.getByText(`${movieDetails.overview}`)).toBeInTheDocument()
    )
    await waitFor(() =>
      expect(screen.getByText(`${movieDetails.release_date}`)).toBeInTheDocument()
    )
    await waitFor(() =>
      expect(screen.getByText(`${movieDetails.runtime} min`)).toBeInTheDocument()
    )
    await waitFor(() =>
      expect(
        screen.getByText(`${movieDetails.popularity} visualizações`)
      ).toBeInTheDocument()
    )
    await waitFor(() =>
      expect(screen.getByText(`${movieDetails.vote_count}`)).toBeInTheDocument()
    )
    await waitFor(() => expect(screen.getByText('Somente adultos')).toBeInTheDocument())
  })

  it('Ensures that the page of movie details render the correct the classification indicative', async () => {
    const release_date = '31-08-2023'
    const popularity = 6.951
    const vote_average = 152.04

    jest.mocked(useFetchMovieDetails).mockResolvedValue({
      movieVideoKey: 'movie_video_key',
      movieDetails: {
        adult: false,
        backdrop_path: '/backdrop_path',
        genres: [
          {
            id: 12,
            name: 'any_genre',
          },
        ],
        id: 123,
        original_language: 'any_language',
        original_title: 'any_title',
        overview: 'any_overview',
        popularity,
        poster_path: '/any_poster_path',
        production_companies: [{ name: 'any_companie' }],
        release_date,
        runtime: 159,
        title: 'any_title',
        video: false,
        vote_average,
        vote_count: 1520,
      },
    })
    jest.mocked(apiService.fetchMovieVideoById).mockResolvedValue({
      results: [{ key: 'movie_video_key' }],
    })
    jest.mocked(apiService.fetchMovieDetailsById).mockResolvedValue(movieDetails)

    render(await MovieDetails({ params: { movie_id: '123' } }))

    await waitFor(() =>
      expect(screen.getByText('Classificação livre')).toBeInTheDocument()
    )
  })

  it('Ensures that the metadata function returns the correct title of  page', async () => {
    const release_date = '31-08-2023'
    const popularity = 6.951
    const vote_average = 152.04

    jest.mocked(useFetchMovieDetails).mockResolvedValue({
      movieVideoKey: 'movie_video_key',
      movieDetails: {
        adult: false,
        backdrop_path: '/backdrop_path',
        genres: [
          {
            id: 12,
            name: 'any_genre',
          },
        ],
        id: 123,
        original_language: 'any_language',
        original_title: 'any_title',
        overview: 'any_overview',
        popularity,
        poster_path: '/any_poster_path',
        production_companies: [{ name: 'any_companie' }],
        release_date,
        runtime: 159,
        title: 'any_title',
        video: false,
        vote_average,
        vote_count: 1520,
      },
    })
    const { title } = await generateMetadata({ params: { movie_id: '123' } })

    await waitFor(() => expect(useFetchMovieDetails).toHaveBeenCalledWith('123'))

    await waitFor(() => expect(title).toEqual('| Filme: any_title'))
  })
})
