import { AiOutlineCalendar } from 'react-icons/ai'

import { SimilarTvShowCardDTO } from '@dtos/movie'
import { returnsMovieImageURL } from '@utils/movieImage'

export type TVSerieRecomendationProps = {
  similarTvShowCard: SimilarTvShowCardDTO
}

export const TVSerieRecomendation = ({
  similarTvShowCard,
}: TVSerieRecomendationProps): JSX.Element => {
  return (
    <section className="min-w-[208px] cursor-pointer text-white">
      <div className="group/recomendation relative h-32 overflow-hidden rounded-lg">
        <img
          src={returnsMovieImageURL(500, similarTvShowCard.backdrop_path)}
          alt={`imagem do filme ${similarTvShowCard.name}`}
          className="h-full w-full object-cover"
        />
        <p className="absolute bottom-0 left-0 hidden w-full bg-gray-100/70 p-2 text-sm font-semibold text-black group-hover/recomendation:block">
          <AiOutlineCalendar className="mb-1 mr-1 inline-block text-sm" />
          {similarTvShowCard.first_air_date}
        </p>
      </div>
      <div className="flex justify-between">
        <p>{similarTvShowCard.name}</p>
        <p className="">{similarTvShowCard.vote_average}%</p>
      </div>
    </section>
  )
}
