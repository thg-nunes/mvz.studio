'use client'
import { myToast } from './toast-config'

const whatchlistKey = process.env.NEXT_PUBLIC_WHATCH_LIST as string

export const addMovieOnWhatchList = (movieId: number) => {
  const whathlistMoviesId = getMoviesFromStorage()

  const movieIddExists = whathlistMoviesId.find((id) => id === movieId)

  if (movieIddExists) {
    return myToast({ type: 'error', message: 'Você já adicionou esse filme a sua lista' })
  }

  localStorage.setItem(whatchlistKey, JSON.stringify([...whathlistMoviesId, movieId]))
}

export const getMoviesFromStorage = () => {
  const moviesIdStorage = localStorage.getItem(whatchlistKey)
  const moviesIdList: number[] | [] = moviesIdStorage ? JSON.parse(moviesIdStorage) : []

  return moviesIdList
}

export const deleteMovieFromWhatchList = (movieId: number) => {
  const whathlistMoviesId = getMoviesFromStorage()

  const whathlistMoviesIdUpdated = whathlistMoviesId.filter((id) => id !== movieId)

  localStorage.setItem(whatchlistKey, JSON.stringify(whathlistMoviesIdUpdated))

  myToast({
    type: 'success',
    message: 'Filme deletado da sua lista!',
  })

  setTimeout(() => window.location.reload(), 5500)
}
