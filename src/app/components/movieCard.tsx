import { returnsMovieURL } from '@utils/movieImage'
import Image from 'next/image'

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
  return (
    <div>
      <Image
        width={180}
        height={180}
        src={returnsMovieURL(500, moviePathImage)}
        alt={`imagem de capa do filme ${movieTitle}`}
      />
      <section>
        <div>
          <p>{movieTitle}</p>
          <p>{movieDescription}</p>
        </div>
        <div>
          <span>{voteAvarege}</span>
          <button>assistir</button>
        </div>
      </section>
    </div>
  )
}
