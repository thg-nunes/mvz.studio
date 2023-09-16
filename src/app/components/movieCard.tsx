import Image from 'next/image'
import { FaStar } from 'react-icons/fa'
import { AiOutlinePlus } from 'react-icons/ai'

import { returnsMovieURL } from '@utils/movieImage'

export type MovieCardProps = {
  movieTitle: string
  voteAvarege: number
  moviePathImage: string
  movieDescription: string
}

export const MovieCard = ({
  movieTitle,
  movieDescription,
  moviePathImage,
  voteAvarege,
}: MovieCardProps): JSX.Element => {
  const movieDescriptionUpdated = movieDescription.slice(0, 40) + '...'
  return (
    <>
      <div className="relative h-60 max-w-[180px] overflow-hidden rounded-xl">
        <Image
          width={180}
          height={180}
          src={returnsMovieURL(500, moviePathImage)}
          alt={`imagem de capa do filme ${movieTitle}`}
        />
        <button className="absolute right-2 top-2 rounded-sm bg-gray-500 p-1 text-xs text-white">
          <AiOutlinePlus />
        </button>
        <section className="absolute bottom-0 left-0 flex h-max flex-col gap-2 bg-white px-1 py-2">
          <div>
            <p className="text-base font-bold">{movieTitle}</p>
            <p className="text-xs font-semibold opacity-80">{movieDescriptionUpdated}</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center text-xs font-semibold">
              {voteAvarege}
              <FaStar className="text-[10px] text-yellow-500" />
            </span>
            <button className="rounded-xl bg-orange-700 p-1 px-2 text-xs font-semibold text-white">
              assistir
            </button>
          </div>
        </section>
      </div>
    </>
  )
}
