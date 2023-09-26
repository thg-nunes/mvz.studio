import { waitFor } from '@testing-library/react'

import { myToast } from '@utils/toast-config'
import { addMovieOnWhatchList, deleteMovieFromWhatchList } from '@utils/movieOnWhatchList'

jest.mock('@utils/toast-config')

describe('@utils/movieOnWhatchList functions', () => {
  it('Ensures that the function to add an movieID in movie list on localStorage execute correctly', () => {
    const setItemMock = jest.fn()
    const getItemMock = jest.fn()

    Storage.prototype.getItem = getItemMock.mockReturnValueOnce(JSON.stringify([]))
    Storage.prototype.setItem = setItemMock

    addMovieOnWhatchList(123)

    expect(jest.spyOn(Storage.prototype, 'getItem')).toHaveBeenCalled()
    expect(jest.spyOn(Storage.prototype, 'setItem')).toHaveBeenCalledWith(
      process.env.NEXT_PUBLIC_WHATCH_LIST,
      JSON.stringify([123])
    )
    expect(myToast).toHaveBeenCalledWith({
      type: 'success',
      message: 'Filme adiciona na sua lista.',
    })
  })

  it('Ensures that an toast with an error message is render if an movieId already exists in localStorageList', () => {
    const setItemMock = jest.fn()
    const getItemMock = jest.fn()

    Storage.prototype.getItem = getItemMock.mockReturnValueOnce(JSON.stringify([123]))
    Storage.prototype.setItem = setItemMock
    addMovieOnWhatchList(123)

    expect(myToast).toHaveBeenCalledWith({
      type: 'error',
      message: 'Você já adicionou esse filme a sua lista',
    })
  })

  it('Ensures that the function to remove an movieID in movie list on localStorage execute correctly', () => {
    const fakeMovieIdInLocalStorage = 123

    jest
      .mocked(Storage.prototype.getItem)
      .mockReturnValueOnce(JSON.stringify([123, 5295, 6485]))

    deleteMovieFromWhatchList(fakeMovieIdInLocalStorage)

    expect(Storage.prototype.getItem).toHaveBeenCalled()

    expect(Storage.prototype.setItem).toHaveBeenCalledWith(
      process.env.NEXT_PUBLIC_WHATCH_LIST,
      JSON.stringify([5295, 6485])
    )

    expect(myToast).toHaveBeenCalledWith({
      type: 'success',
      message: 'Filme deletado da sua lista!',
    })

    waitFor(() => expect(window.location.reload).toHaveBeenCalled())
  })
})
