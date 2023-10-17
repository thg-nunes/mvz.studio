import Link from 'next/link'
import { Metadata } from 'next'

import { returnsMovieImageURL } from '@utils/movieImage'

import { useFetchTVSerieDetails } from '@app/hooks/pages/detalhes/tv/serie_id'
import { useFetchSerieSeason } from '@app/hooks/pages/temporadas/[tv_serie_id]'

type PageParams = {
  params: { serie_id: string }
}

export const generateMetadata = async ({ params }: PageParams): Promise<Metadata> => {
  /** como uma busca por dados da serie já terá sido feita, os dados já estarão em cache, então realizo uma busca para reaproveitar esses dados do cache, e renderizar o nome da série */
  const { serieDetails } = await useFetchTVSerieDetails(params.serie_id)

  return {
    title: '| ' + serieDetails.name,
  }
}

export default async function TVSerieSeasons({
  params,
}: PageParams): Promise<JSX.Element> {
  /** como uma busca por dados da serie já terá sido feita, os dados já estarão em cache, então realizo uma busca para reaproveitar esses dados do cache, e renderizar o nome da série */
  const { serieDetails } = await useFetchTVSerieDetails(params.serie_id)
  const seasons = await useFetchSerieSeason(params.serie_id)

  return (
    <div className="mx-auto mb-10 flex w-[85%] flex-col gap-3 text-white">
      <h2 className="my-5 text-2xl font-semibold">{serieDetails.name}</h2>

      {seasons.map((season) => (
        <section key={season.id} className="flex gap-3">
          <Link href={`/detalhes/tv/${params.serie_id}/season/${season.season_number}`}>
            <img
              src={returnsMovieImageURL(500, season.poster_path)}
              alt={`imagem do filme ${season.name}`}
              className="h-44 max-w-[144px] rounded-lg object-cover duration-150 hover:scale-110"
            />
          </Link>
          <div className="flex flex-col justify-around">
            <section className="flex flex-col gap-2 text-xs font-semibold">
              <Link
                href={`/detalhes/tv/${params.serie_id}/season/${season.season_number}`}
                className="w-max duration-150 hover:text-gray-400"
              >
                <p className="text-2xl font-semibold">{season.name}</p>
              </Link>
              <p>
                {season.debutYear} • {season.episode_count} episódios
              </p>
            </section>
            <section className="flex flex-col gap-2 text-sm">
              <p>
                A {season.season_number}ª temporada de {season.name} começou a ser exibida
                em {season.air_date}
              </p>
              <p>{season.overview}</p>
            </section>
          </div>
        </section>
      ))}
    </div>
  )
}
