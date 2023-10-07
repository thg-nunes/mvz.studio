import { useRouter } from 'next/navigation'
import { render } from '@testing-library/react'

import HomePage, { metadata } from '@app/(pages)/home/page'
import { useFetchCarouselMoviesList } from '@app/hooks/components/carousel'
import { useFetchMoviesByGenre } from '@app/hooks/components/moviesList'

jest.mock('next/navigation')
const useRouterMock = useRouter as jest.Mock

jest.mock('@app/hooks/components/carousel')
const useFetchCarouselMoviesListMock = useFetchCarouselMoviesList as jest.Mock

jest.mock('@app/hooks/components/moviesList')
const useFetchMoviesByGenreMock = useFetchMoviesByGenre as jest.Mock

describe('<HomePage />', () => {
  it('enrures thte the home page render correctly', async () => {
    useRouterMock.mockReturnValue({
      push: jest.fn(),
    })

    useFetchCarouselMoviesListMock.mockReturnValue({
      movies: [
        {
          poster_path: 'fake_poster_path',
          id: 1,
          overview: 'fake_overview',
          title: 'fake_title',
        },
      ],
    })

    useFetchMoviesByGenreMock.mockReturnValue([
      {
        adult: false,
        poster_path: 'fake_poster_path',
        id: 1,
        overview: 'fake_overview',
        title: 'fake_title',
        backdrop_path: 'fake_backdrop',
        genre_ids: [1, 2, 3],
        original_language: 'fake_original_language',
        original_title: 'fake_original_title',
        popularity: 143,
        release_date: 'fake_release_date',
        video: false,
        vote_average: 8.8,
        vote_count: 1235,
      },
    ])

    render(await HomePage())
  })

  it('ensures that the metadata return the correct title', () => {
    expect(metadata).toHaveProperty('title', '| Home')
  })
})
