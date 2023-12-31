'use client'
import { useRouter } from 'next/navigation'
import { Carousel, Typography } from '@material-tailwind/react'

import { returnsMovieImageURL } from '@utils/movieImage'
import { useFetchCarouselMoviesList } from '@app/hooks/components/carousel'
import { addMovieOnWhatchList } from '@utils/movieOnWhatchList'

export const Caroursel = (): JSX.Element => {
  const { push } = useRouter()
  const { movies } = useFetchCarouselMoviesList()

  return (
    <div className="mx-auto h-[400px] w-[70%] py-12">
      <Carousel className="carouselButton relative overflow-hidden rounded-3xl">
        {movies.map(({ id, title, poster_path, overview }) => {
          return (
            <div key={`${id}-${title}`}>
              <img
                src={returnsMovieImageURL(500, poster_path)}
                alt={`imagem do filme ${title}`}
                className="carouselElement h-full w-full object-cover"
              />
              <section
                key={id}
                className="absolute bottom-0 flex h-full w-full flex-col justify-between bg-gray-900/50 px-12 py-6 text-white shadow-2xl"
              >
                <div className="flex w-3/4 flex-col gap-2">
                  <Typography className="top-0 text-4xl font-bold">{title}</Typography>
                  <Typography>{overview}</Typography>
                </div>
                <div className="flex h-max justify-between font-bold">
                  <button
                    onClick={() => addMovieOnWhatchList(id)}
                    className="rounded-md bg-gray-600/50 p-2 px-4 text-base text-white hover:shadow-3xl hover:shadow-gray-600/70"
                  >
                    +Watchlist
                  </button>
                  <button className="blueButton" onClick={() => push('/detalhes/' + id)}>
                    Assistir
                  </button>
                </div>
              </section>
            </div>
          )
        })}
      </Carousel>
    </div>
  )
}
