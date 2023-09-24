import { addMovieOnWhatchList } from '@utils/movieOnWhatchList'

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

  it('', () => {
    const setItemMock = jest.fn()
    const getItemMock = jest.fn()

    Storage.prototype.getItem = getItemMock.mockReturnValueOnce(JSON.stringify([123]))
    Storage.prototype.setItem = setItemMock

    expect(() => addMovieOnWhatchList(123)).toThrow(
      'Você já adicionou esse filme a sua lista'
    )
  })
})
