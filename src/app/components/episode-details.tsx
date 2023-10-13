import { FaStar } from 'react-icons/fa'
import { returnsMovieImageURL } from '@utils/movieImage'

type SeasonDetailsProps = {
  episode_number: number
  name: string
  vote_average: number
  air_date: string
  poster_path: string
  runtime: number
  overview: string
}

export const EpisodeDetails = ({
  air_date,
  episode_number,
  name,
  poster_path,
  overview,
  runtime,
  vote_average,
}: SeasonDetailsProps): JSX.Element => {
  return (
    <div className="mb-6 flex cursor-pointer gap-3 overflow-hidden rounded-tl-md bg-gray-900 text-white hover:shadow-3xl hover:shadow-white/20">
      <img
        className="h-36 w-56 min-w-[224px]"
        src={returnsMovieImageURL(500, poster_path)}
        alt={`imagem do episódio ${episode_number} da série ${name}`}
      />
      <section className="flex flex-col justify-around">
        <p className="text-sm font-bold">
          {episode_number} - {name}
        </p>

        <div className="flex items-center gap-3 text-sm">
          <span className="flex items-center gap-1 rounded-2xl bg-cyan-600 px-2 py-1 text-xs">
            {vote_average} <FaStar className="mb-[0.125rem]" />
          </span>
          <p className="text-gray-300">
            {air_date} • {runtime}m
          </p>
        </div>

        <p className="text-sm">{overview}</p>
      </section>
    </div>
  )
}
