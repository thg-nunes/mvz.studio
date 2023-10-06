import { notFound } from 'next/navigation'

import { apiService } from '@app/services/api'
import { useFetchMovieDetails } from '@app/hooks/pages/detalhes/[movie_id]'
import { waitFor } from '@testing-library/react'

jest.mock('next/navigation')
jest.mock('@app/services/api')

describe('useFetchMovieDetails', () => {
  it('Ensures that the hook useFetchMovieDetails returns the movie details with date, popularity and vote_average conveted to brazilian pattern', async () => {
    const release_date = '31-08-2023'
    const popularity = 6.951
    const vote_average = 152.04

    jest.mocked(apiService.fetchMovieVideoById).mockResolvedValue({
      results: [
        {
          key: 'any_movie_video_key',
        },
      ],
    })

    jest.mocked(apiService.fetchMovieDetailsById).mockResolvedValueOnce({
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
    })

    const { movieDetails, movieVideoKey } = await useFetchMovieDetails('82')

    expect(movieDetails.release_date).toEqual(
      new Date(movieDetails.release_date).toLocaleDateString()
    )
    expect(movieDetails.popularity).toEqual(parseInt(movieDetails.popularity.toFixed(0)))
    expect(movieDetails.vote_average).toEqual(
      parseInt(movieDetails.vote_average.toFixed(0))
    )
    expect(movieVideoKey).toEqual('any_movie_video_key')
  })

  it('Ensures that the notFound function is called if the result of fetch is null or not contains content', async () => {
    const release_date = '31-08-2023'
    const popularity = 6.951
    const vote_average = 152.04

    jest.mocked(apiService.fetchMovieVideoById).mockResolvedValue({
      results: [],
    })

    jest.mocked(apiService.fetchMovieDetailsById).mockResolvedValueOnce({
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
    })

    await useFetchMovieDetails('123')

    await waitFor(() => expect(notFound).toHaveBeenCalled())
  })
})
