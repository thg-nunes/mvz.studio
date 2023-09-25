import { myToast } from '@utils/toast-config'
import { addMovieOnWhatchList } from '@utils/movieOnWhatchList'

jest.mock('@utils/toast-config')

describe('addMovieOnWhatchList', () => {
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
})
