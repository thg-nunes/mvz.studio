import { fireEvent, render, screen } from '@testing-library/react'

import { addMovieOnWhatchList } from '@utils/movieOnWhatchList'
import { AddWhatchListButton } from '@app/components/movieCard/addWhatchListButton'

jest.mock('@utils/movieOnWhatchList')

describe('<AddWhatchListButton />', () => {
  it('Ensures that the button call the correct function to add movie on whatchlist', () => {
    render(<AddWhatchListButton movieId={123} />)

    expect(screen.getByRole('button')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button'))

    expect(jest.mocked(addMovieOnWhatchList)).toHaveBeenNthCalledWith(1, 123)
  })
})
