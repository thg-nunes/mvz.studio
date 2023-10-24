'use client'
import { useState } from 'react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'

import { SeasonEpisodeDetailsDTO } from '@dtos/movie'
import { returnsMovieImageURL } from '@utils/movieImage'

export type GestStarsProps = Pick<SeasonEpisodeDetailsDTO, 'guest_stars'>

export const GESTERS_PER_PAGE = 4

export const GestStars = ({ guest_stars }: GestStarsProps): JSX.Element => {
  const [currentPage, setCurrentePage] = useState(0)
  const [nextPage, setNextPage] = useState(1)
  const total_pages = Math.ceil(guest_stars.length / GESTERS_PER_PAGE)

  return (
    <section className="grid w-3/4 grid-cols-2 grid-rows-2 gap-3">
      {guest_stars.length ? (
        guest_stars
          .slice(currentPage * GESTERS_PER_PAGE, GESTERS_PER_PAGE * nextPage)
          .map(({ id, character, name, profile_path }) => (
            <div key={id} className="flex items-center gap-3 text-white">
              {profile_path && (
                <img
                  src={returnsMovieImageURL(500, profile_path)}
                  alt={`foto do convidado ${name}`}
                  className="h-full max-h-16 w-full max-w-[66px] rounded-sm object-cover"
                />
              )}
              <section>
                <p className="text-sm font-bold">{name}</p>
                <p className="text-xs">{character}</p>
              </section>
            </div>
          ))
      ) : (
        <p className="col-span-2 text-sm text-white">
          Nenhum convidado para esse episódio.
        </p>
      )}
      <button
        disabled={currentPage - 1 < 0}
        className="mx-auto h-max w-1/3 rounded-md bg-cyan-700 px-6 py-[6px] font-semibold text-white transition-all duration-150 ease-linear hover:bg-cyan-600 disabled:cursor-no-drop disabled:bg-cyan-700"
        onClick={() => {
          if (currentPage - 1 < 0) return

          setCurrentePage((prevState) => prevState - 1)
          setNextPage((prevState) => prevState - 1)
        }}
      >
        <BsArrowLeft className="mx-auto text-xl" />
      </button>
      <button
        disabled={currentPage + 1 >= total_pages}
        className="mx-auto h-max w-1/3 rounded-md bg-cyan-700 px-6 py-[6px] font-semibold text-white transition-all duration-150 ease-linear hover:bg-cyan-600 disabled:cursor-no-drop disabled:bg-cyan-700"
        onClick={() => {
          if (currentPage + 1 >= total_pages) return

          setCurrentePage((prevState) => prevState + 1)
          setNextPage((prevState) => prevState + 1)
        }}
      >
        <BsArrowRight className="mx-auto text-xl" />
      </button>
    </section>
  )
}
