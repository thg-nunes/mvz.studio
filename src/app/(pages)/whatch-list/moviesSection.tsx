'use client'

import { AiFillClockCircle } from 'react-icons/ai'
import { BsCalendarCheckFill } from 'react-icons/bs'

import { returnsMovieImageURL } from '@utils/movieImage'
import { getMoviesFromStorage } from '@utils/movieOnWhatchList'

import { useGetMoviesById } from '@app/hooks/pages/whatch-list'

export const MoviesSection = (): JSX.Element => {
  const moviesIdStorage = getMoviesFromStorage()
  const whatchListMoviesData = useGetMoviesById({ moviesId: moviesIdStorage })

  return (
    <div className="flex flex-col px-10 py-4 text-white">
      {whatchListMoviesData.map((movie) => (
        <div
          key={movie.id}
          className="flex items-center border-b border-solid border-white/30 py-6"
        >
          <img
            className="h-60 w-60 scale-90 cursor-pointer rounded-md duration-150 hover:scale-100"
            src={returnsMovieImageURL(500, movie.poster_path)}
            alt={`imagem do filme ${movie.title}`}
          />

          <section className="relative flex h-fit w-full flex-col gap-6 px-10 text-white">
            <div>
              <p className="text-2xl font-bold">Título: {movie.title}</p>
              <p>
                Descrição: <span className="text-sm">{movie.overview}</span>
              </p>
            </div>
            <div>
              <section className="flex items-center justify-between gap-2">
                <div>
                  <p>Gêneros</p>
                  <div className="flex items-center gap-2">
                    {movie.genres.map(({ id, name }) => (
                      <span key={id} className="orangeButton">
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p>Lançamento</p>
                  <section className="flex items-center gap-2">
                    <span className="text-sm">{movie.release_date}</span>
                    <BsCalendarCheckFill />
                  </section>
                </div>
                <p className="flex w-max items-center gap-2">
                  <AiFillClockCircle />
                  <span className="text-sm"> {movie.runtime} min</span>
                </p>
              </section>
            </div>
            <button className="blueButton text-white">assistir</button>
          </section>
        </div>
      ))}
    </div>
  )
}
