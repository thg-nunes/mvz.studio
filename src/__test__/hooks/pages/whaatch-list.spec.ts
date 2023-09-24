import { useEffect, useState } from 'react'

import { apiService } from '@app/services/api'
import { useGetMoviesById } from '@app/hooks/pages/whatch-list'
import { MovieDetailsDTO } from '@dtos/movie'
import { waitFor } from '@testing-library/react'

jest.mock('react')
jest.mock('@app/services/api')

describe('useGetMoviesById', () => {
  const fakeMoviesId = [1]
  const fakeMoviesResponse = {
    adult: false,
    backdrop_path: '/55Rb9qt3yzyF4KQpC1c3T3Fbcao.jpg',
    genres: [
      {
        id: 1,
        name: 'any_genre',
      },
    ],
    production_companies: [{ name: 'any_companie_name' }],
    runtime: 159,
    id: 1008042,
    original_language: 'en',
    original_title: 'Talk to Me',
    overview:
      'When a group of friends discover how to conjure spirits using an embalmed hand, they become hooked on the new thrill, until one of them goes too far and unleashes terrifying supernatural forces.',
    popularity: 3538.457,
    poster_path: '/kdPMUMJzyYAc4roD52qavX0nLIC.jpg',
    release_date: '2023-07-26',
    title: 'Talk to Me',
    video: false,
    vote_average: 7.3,
    vote_count: 613,
  }

  const moviesDetails: MovieDetailsDTO[] = []
  const setMoviesDetails = jest.fn()

  it('Ensures that the hook useGetMoviesById returns an array with all movies data by id', async () => {
    jest.mocked(apiService.fetchMoviesById).mockResolvedValue({
      results: [fakeMoviesResponse],
    })
    jest.mocked(useEffect).mockImplementationOnce((callback) => callback())
    jest.mocked(useState).mockReturnValueOnce([moviesDetails, setMoviesDetails])

    useGetMoviesById({ moviesId: fakeMoviesId })
    const response = await apiService.fetchMoviesById(fakeMoviesId)

    expect(apiService.fetchMoviesById).toHaveBeenCalledWith(fakeMoviesId)
    await waitFor(() =>
      expect(setMoviesDetails).toHaveBeenNthCalledWith(1, [fakeMoviesResponse])
    )

    await waitFor(() => expect(response.results).toEqual([fakeMoviesResponse]))
  })
})
