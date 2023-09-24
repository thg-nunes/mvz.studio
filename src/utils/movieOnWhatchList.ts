import { AppError } from './appErrorr'

const whatchlistKey = process.env.NEXT_PUBLIC_WHATCH_LIST as string

export const addMovieOnWhatchList = (movieId: number) => {
  const whathlistMoviesId = getMoviesFromStorage()

  const movieIddExists = whathlistMoviesId.find((id) => id === movieId)

  if (movieIddExists) {
    throw new AppError('Você já adicionou esse filme a sua lista')
  }

  localStorage.setItem(whatchlistKey, JSON.stringify([...whathlistMoviesId, movieId]))
}

export const getMoviesFromStorage = () => {
  const moviesIdStorage = localStorage.getItem(whatchlistKey)
  const moviesIdList: number[] | [] = moviesIdStorage ? JSON.parse(moviesIdStorage) : []

  return moviesIdList
}
