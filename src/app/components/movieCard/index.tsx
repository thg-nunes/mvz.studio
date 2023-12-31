import Link from 'next/link'
import Image from 'next/image'
import { FaStar } from 'react-icons/fa'

import { ListTypeDTO } from '@dtos/movie'
import { returnsMovieImageURL } from '@utils/movieImage'
import { AddWhatchListButton } from './addWhatchListButton'

export type MovieCardProps = {
  movie_id: number
  movieTitle: string
  voteAvarege: number
  moviePathImage: string
  movieDescription: string
  listType: ListTypeDTO
}

export const MovieCard = ({
  movieTitle = '',
  movie_id,
  movieDescription = '',
  listType,
  moviePathImage,
  voteAvarege,
}: MovieCardProps): JSX.Element => {
  const movieTitleUpdated = movieTitle.slice(0, 14) + '...'

  const movieDescriptionUpdated = movieDescription.length
    ? movieDescription.slice(0, 36) + '...'
    : 'este filme não tem descrição'

  return (
    <div className="relative h-60 max-w-[180px] overflow-hidden rounded-xl">
      <Image
        width={180}
        height={180}
        src={returnsMovieImageURL(500, moviePathImage)}
        alt={`imagem de capa do filme ${movieTitle}`}
      />
      <AddWhatchListButton movieId={movie_id} />
      <section className="absolute bottom-0 left-0 flex h-max w-full flex-col gap-2 bg-white px-1 py-2">
        <div>
          <p className="text-base font-bold">{movieTitleUpdated}</p>
          <p className="text-xs font-semibold opacity-80">{movieDescriptionUpdated}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center text-xs font-semibold">
            {voteAvarege}
            <FaStar className="text-[10px] text-yellow-500" />
          </span>
          <Link href={`/detalhes/${listType}/${movie_id}`} className="orangeButton">
            assistir
          </Link>
        </div>
      </section>
    </div>
  )
}
