'use client'

import { useState } from 'react'
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'

import { MovieCard } from './movieCard'
import { useFetchMoviesByGenre } from '@app/hooks/components/moviesList'

export type MoviesListProps = {
  genreId: number
  listTitle: string
}

const BUTTON_STYLE_CONFIG = {
  default:
    'rounded-sm bg-cyan-600 px-2 transition-all duration-150 hover:bg-cyan-600/90 hover:shadow-3xl hover:shadow-cyan-600/50',
  active:
    'rounded-sm bg-cyan-600/70 px-2 transition-all duration-150 hover:bg-cyan-600/90 hover:shadow-3xl hover:shadow-cyan-600/50',
}

export const MoviesList = ({ genreId, listTitle }: MoviesListProps): JSX.Element => {
  const [firstFilms, setFirstFilms] = useState(5)
  const [activePage, setAvtivePage] = useState(1)

  const listMovies = useFetchMoviesByGenre(genreId, activePage)
  const buttons = new Array(5).fill(null)

  return (
    <div className="flex flex-col gap-3 px-10 py-4">
      <p className="text-2xl font-semibold text-white">{listTitle}</p>
      <section className="flex flex-wrap justify-between gap-y-6">
        {listMovies
          .slice(0, firstFilms)
          .map(({ id, overview, poster_path, title, vote_average }) => (
            <MovieCard
              key={id}
              movieDescription={overview}
              moviePathImage={poster_path}
              movieTitle={title}
              voteAvarege={vote_average}
            />
          ))}
      </section>
      {firstFilms === 5 ? (
        <button
          onClick={() => setFirstFilms(listMovies.length)}
          className="relative mx-auto flex w-24 items-center gap-2 rounded-xl bg-orange-700 p-1 px-2 text-xs font-semibold text-white"
        >
          ver mais
          <AiOutlineArrowDown className=" absolute right-2 animate-floating text-base" />
        </button>
      ) : (
        <>
          <div
            id={listTitle}
            className="mx-auto grid grid-cols-5 gap-3 font-semibold text-white"
          >
            {buttons.map((_, index) => {
              return (
                <button
                  key={`button-${index}`}
                  className={
                    activePage === index + 1
                      ? BUTTON_STYLE_CONFIG.active
                      : BUTTON_STYLE_CONFIG.default
                  }
                  onClick={() => setAvtivePage(index + 1)}
                >
                  {index + 1}
                </button>
              )
            })}
          </div>
          <button
            onClick={() => setFirstFilms(5)}
            className="relative mx-auto flex w-24 items-center gap-2 rounded-xl bg-orange-700 p-1 px-2 text-xs font-semibold text-white"
          >
            ver menos
            <AiOutlineArrowUp className=" absolute right-2 animate-floating text-base" />
          </button>
        </>
      )}
    </div>
  )
}
