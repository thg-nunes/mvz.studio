import { act, fireEvent, render, screen } from '@testing-library/react'

import { addMovieOnWhatchList } from '@utils/movieOnWhatchList'
import { SerieDetails } from '@app/(pages)/detalhes/tv/[tv_serie_id]/serieDetails'

jest.mock('@utils/movieOnWhatchList')

describe('<SerieDetails />', () => {
  const serie_details = {
    name: 'fake_name',
    genres: [
      { id: 1, name: 'any_genre1' },
      { id: 2, name: 'any_genre2' },
    ],
    vote_average: 1523,
    id: 12548,
    overview: 'fake_overview',
  }

  it('ensures tht the button action execute with correct serie id', () => {
    render(
      <SerieDetails
        serieData={{
          ...serie_details,
          created_by: [
            {
              name: 'any_name',
              profile_path: 'fake_profile_path',
            },
          ],
        }}
      />
    )

    act(() => fireEvent.click(screen.getByText('+whatch-list')))

    expect(addMovieOnWhatchList).toHaveBeenCalledWith(serie_details.id)
  })

  it('ensures that the case to render serie genre execute correctly', () => {
    render(
      <SerieDetails
        serieData={{
          ...serie_details,
          overview: '',
          created_by: [
            {
              name: 'any_name',
              profile_path: 'fake_profile_path',
            },
          ],
        }}
      />
    )

    expect(
      screen.getByText('Este filme não possui um overview escrito.')
    ).toBeInTheDocument()

    expect(screen.getByText('any_genre1 |')).toBeInTheDocument()

    expect(screen.getByText('any_genre2')).toBeInTheDocument()
  })
})
