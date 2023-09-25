import Link from 'next/link'
import { FaStar } from 'react-icons/fa'
import { MdBlockFlipped } from 'react-icons/md'
import { BsCalendarCheckFill } from 'react-icons/bs'
import { AiFillEye, AiFillClockCircle, AiFillCheckCircle } from 'react-icons/ai'

import { returnsMovieImageURL } from '@utils/movieImage'
import { useFetchMovieDetails } from '@app/hooks/pages/detalhes/[movie_id]'

import { MoviesList } from '@app/components/moviesList'
import { Metadata } from 'next'

export type MovieDetailsProps = {
  params: {
    movie_id: string
  }
}

export const generateMetadata = async ({
  params,
}: MovieDetailsProps): Promise<Metadata> => {
  const { movieDetails } = await useFetchMovieDetails(params.movie_id)

  return {
    title: movieDetails.title,
  }
}

const CLASSIFICATION_INDICATIVE_TEXT_STYLE = {
  free: 'flex items-center gap-1 rounded-md bg-green-500 p-1 text-sm',
  adult: 'flex items-center gap-1 rounded-md bg-red-500 p-1 text-sm',
}

export default async function MovieDetails({
  params: { movie_id },
}: MovieDetailsProps): Promise<JSX.Element> {
  const { movieDetails, movieVideoKey } = await useFetchMovieDetails(movie_id)

  return (
    <>
      <div className="mx-auto h-[400px] w-[70%] overflow-hidden rounded-3xl">
        <img
          src={returnsMovieImageURL(500, movieDetails.poster_path)}
          alt={`imagem do filme ${movieDetails.title}`}
          className="carouselElement h-full w-full object-cover"
        />
      </div>
      <section className="relative flex flex-col gap-6 px-10 py-4 text-white">
        <div>
          <p className="text-2xl font-bold">Título: {movieDetails.title}</p>
          <p>
            Descrição: <span className="text-sm">{movieDetails.overview}</span>
          </p>
        </div>
        <div className="flex items-center justify-between">
          <section>
            <p>Gêneros </p>
            <div className="flex items-center gap-2">
              {movieDetails.genres.map(({ id, name }) => (
                <span key={id} className="orangeButton hover:cursor-not-allowed">
                  {name}
                </span>
              ))}
            </div>
          </section>
          <p className="flex w-max items-center gap-2">
            Lançado em:
            <span className="text-sm">{movieDetails.release_date}</span>
            <BsCalendarCheckFill />
          </p>
          <p className="flex w-max items-center gap-2">
            <AiFillClockCircle />
            <span className="text-sm"> {movieDetails.runtime} min</span>
          </p>
          <p
            className={
              movieDetails.adult
                ? CLASSIFICATION_INDICATIVE_TEXT_STYLE.adult
                : CLASSIFICATION_INDICATIVE_TEXT_STYLE.free
            }
          >
            {movieDetails.adult ? 'Somente adultos' : 'Classificação livre'}
            {movieDetails.adult ? <MdBlockFlipped /> : <AiFillCheckCircle />}
          </p>
        </div>

        <div className="flex items-center justify-around">
          <p className="flex w-max items-center gap-1">
            <AiFillEye />
            <span className="text-sm"> {movieDetails.popularity} visualizações</span>
          </p>
          <p className="flex items-center text-sm font-semibold">
            Classificação:
            <span className="ml-1 flex items-center gap-1 text-xs">
              {movieDetails.vote_average}
              <FaStar className="text-xs text-yellow-500" />
            </span>
          </p>
          <p>
            Total de votos: <span className="text-sm"> {movieDetails.vote_count}</span>
          </p>
        </div>

        <Link
          target="_blank"
          href={`https://www.youtube.com/embed/${movieVideoKey}`}
          className="blueButton mx-auto w-1/3 text-center font-semibold text-white"
        >
          Ver trailer
        </Link>
      </section>
      {movieDetails.genres.map((genre, index) => (
        <MoviesList
          key={genre.name}
          genreId={movieDetails.genres[index].id}
          listTitle={movieDetails.genres[index].name}
        />
      ))}
    </>
  )
}
