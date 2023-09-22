import { useFetchCarouselMoviesList } from '@app/hooks/components/carousel'
import { useState } from 'react'
import { waitFor } from '@testing-library/react'

import { apiService } from '@app/services/api'

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    useState: jest.fn(),
    useEffect: jest.fn((callbackFn) => callbackFn()),
  }
})
const useStateMock = useState as jest.Mock

jest.mock('@app/services/api', () => {
  return {
    apiService: {
      fetchCarouselMovies: jest.fn(),
    },
  }
})

describe('useFetchCarouselMoviesList', () => {
  const movies: [] = []
  const setMovies = jest.fn()
  const fakeAPIResponse = [
    {
      id: 123,
      title: 'fake_title',
      poster_path: 'fake_poster_path',
      overview: 'fake_overview',
    },
  ]

  beforeEach(() => {
    useStateMock.mockReturnValue([movies, setMovies])

    jest.mocked(apiService.fetchCarouselMovies).mockResolvedValue(fakeAPIResponse)
  })

  it('Ensures that the hook to get movies list to carouel of movies movies execute correctly', async () => {
    useFetchCarouselMoviesList()

    await waitFor(() => expect(setMovies).toHaveBeenCalledWith(fakeAPIResponse))

    useStateMock.mockReturnValueOnce([fakeAPIResponse, setMovies])

    const { movies } = useFetchCarouselMoviesList()

    await waitFor(() => expect(movies).toEqual(fakeAPIResponse))
  })
})
