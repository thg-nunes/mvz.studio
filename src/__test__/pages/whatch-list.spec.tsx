import { fireEvent, render, screen } from '@testing-library/react'

import { deleteMovieFromWhatchList } from '@utils/movieOnWhatchList'
import { useGetMoviesById } from '@app/hooks/pages/whatch-list'

import WhatchListPage from '@app/(pages)/whatch-list/page'

jest.mock('@utils/movieOnWhatchList')
jest.mock('@app/hooks/pages/whatch-list')

describe('<WhatchListPage />', () => {
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

  it('Ensures that the whatch-list page render the correct elements', () => {
    jest.mocked(useGetMoviesById).mockReturnValue([fakeMoviesResponse])

    render(<WhatchListPage />)

    expect(screen.getByText(`Título: ${fakeMoviesResponse.title}`)).toBeInTheDocument()
    expect(screen.getByText(fakeMoviesResponse.overview)).toBeInTheDocument()
    expect(screen.getByText(fakeMoviesResponse.release_date)).toBeInTheDocument()
    expect(screen.getByText(`${fakeMoviesResponse.runtime} min`)).toBeInTheDocument()
  })

  it('ensures that the function to remove one movie of watch-list execute on click in the button', () => {
    jest.mocked(useGetMoviesById).mockReturnValue([fakeMoviesResponse])

    render(<WhatchListPage />)

    const remove_button = screen.getByText((content, element) => {
      return (
        element?.tagName.toLowerCase() === 'button' &&
        content.startsWith('remover da lista')
      )
    })

    fireEvent.click(remove_button)

    expect(deleteMovieFromWhatchList).toHaveBeenCalledWith(fakeMoviesResponse.id)
  })
})
