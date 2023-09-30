'use client'

import { TVSerieDetails } from '@dtos/movie'
import { returnsMovieImageURL } from '@utils/movieImage'
import { addMovieOnWhatchList } from '@utils/movieOnWhatchList'

export type SerieDetailsProps = {
  serieData: TVSerieDetails
}

export const SerieDetails = ({ serieData }: SerieDetailsProps): JSX.Element => {
  return (
    <div className="flex max-h-[75%] flex-col justify-between gap-4 text-white">
      <section>
        <p className="text-3xl font-semibold">{serieData.name}</p>
        <div className="flex items-center gap-2">
          {serieData.genres.map(({ id, name }, index) => (
            <span key={id} className="text-sm">
              {index > 0 && index < serieData.genres.length ? `${name}` : `${name}, `}
            </span>
          ))}
        </div>
      </section>

      <section className="flex items-center gap-8">
        <p>Classificação: {serieData.vote_average}%</p>
        <button
          className={'blueButton font-semibold text-white'}
          onClick={() => addMovieOnWhatchList(serieData.id)}
        >
          +whatch-list
        </button>
      </section>

      <section>
        <p className="font-semibold">Sinopse</p>
        <p className="w-3/4 text-sm">
          {serieData.overview
            ? serieData.overview
            : 'Este filme não possui um overview escrito.'}
        </p>
      </section>
      <section className="flex items-center gap-3">
        <img
          src={returnsMovieImageURL(500, serieData.created_by[0].profile_path)}
          alt={`foto do criador da série ${serieData.created_by[0].name}`}
          className="h-12 w-12 rounded-full object-cover"
        />
        <p>
          {serieData.created_by[0].name}
          <span className="block text-center text-xs">criador</span>
        </p>
      </section>
    </div>
  )
}
