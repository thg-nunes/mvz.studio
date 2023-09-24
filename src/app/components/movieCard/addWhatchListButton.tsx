'use client'
import { AiOutlinePlus } from 'react-icons/ai'

import { addMovieOnWhatchList } from '@utils/movieOnWhatchList'

type AddWhatchListButtonProps = {
  movieId: number
}

export const AddWhatchListButton = ({
  movieId,
}: AddWhatchListButtonProps): JSX.Element => {
  return (
    <button
      onClick={() => addMovieOnWhatchList(movieId)}
      className="absolute right-2 top-2 rounded-sm bg-gray-500 p-1 text-xs text-white duration-150 hover:scale-110"
      data-testid="whatchListButton"
    >
      <AiOutlinePlus />
    </button>
  )
}
