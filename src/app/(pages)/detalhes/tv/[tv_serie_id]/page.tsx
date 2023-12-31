import Link from 'next/link'
import { Metadata } from 'next'
import { AiFillStar } from 'react-icons/ai'

import { returnsMovieImageURL } from '@utils/movieImage'
import {
  useFetchSimilarTVSeries,
  useFetchTVSerieDetails,
} from '@app/hooks/pages/detalhes/tv/serie_id'

import { SerieDetails } from './serieDetails'
import { TVSerieRecomendation } from '@app/components/tvSerieRecomendation'

type PageParams = {
  params: { tv_serie_id: string }
}

export const generateMetadata = async ({ params }: PageParams): Promise<Metadata> => {
  const { serieDetails } = await useFetchTVSerieDetails(params.tv_serie_id)

  return {
    title: ' - ' + serieDetails.name,
  }
}

export default async function TvSerieDetailsById({ params }: PageParams) {
  const { serieDetails, serieImages } = await useFetchTVSerieDetails(params.tv_serie_id)
  const { similarTvSeries } = await useFetchSimilarTVSeries(params.tv_serie_id)

  const lastSeason = serieDetails.seasons.pop()
  const numberOfLastSeason = lastSeason ? lastSeason.season_number + 1 : 1
  const lastAirDate = serieDetails.last_air_date.split('/').pop()

  return (
    <div>
      <div className="relative h-[450px]">
        <img
          src={returnsMovieImageURL(500, serieDetails.backdrop_path)}
          alt={`imagem do filme ${serieDetails.name}`}
          className="carouselElement h-full w-full object-cover"
        />
        <section className="absolute left-0 top-0 flex h-full w-full items-center gap-4 bg-black/70 px-3">
          <img
            src={returnsMovieImageURL(500, serieDetails.backdrop_path)}
            alt={`imagem do filme ${serieDetails.name}`}
            className="carouselElement h-3/4 w-1/4 rounded-lg object-cover"
          />
          <SerieDetails serieData={serieDetails} />
        </section>
      </div>
      <div className="mx-auto w-[85%] py-6">
        <p className="mb-3 text-2xl font-semibold text-white">Temporada Atual</p>
        <section className="mb-4 flex gap-3 overflow-hidden rounded-lg bg-gray-900 text-white shadow-3xl shadow-white/20">
          <img
            src={returnsMovieImageURL(500, serieDetails.backdrop_path)}
            alt={`imagem do filme ${serieDetails.name}`}
            className="carouselElement h-[192px] w-[144px] object-cover"
          />
          <div className="flex max-h-[192px] flex-col justify-around">
            <section>
              <p className="text-xl font-semibold">Temporada {numberOfLastSeason}</p>

              <section className="flex gap-3">
                <p className="flex items-center rounded-xl bg-orange-700 px-2 text-sm">
                  <AiFillStar className="text-xs" /> {lastSeason?.vote_average}
                </p>
                <p className="text-sm font-semibold">
                  {lastAirDate} • {serieDetails.number_of_episodes} episódios
                </p>
              </section>
            </section>

            <section>
              <p className="text-lg font-semibold">{lastSeason?.name}</p>
              <p className="w-3/4 text-sm">{lastSeason?.overview}</p>
            </section>

            <p className="text-sm">
              NOTA: A {numberOfLastSeason}ª temporada de {serieDetails.name} começou a ser
              exibida em {serieDetails.last_air_date}.
            </p>
          </div>
        </section>

        <Link
          href={`/detalhes/tv/temporadas/${serieDetails.id}`}
          className="text-white duration-150 hover:text-gray-400"
        >
          mostrar mais temporadas
        </Link>
      </div>

      <div className="mx-auto w-[85%] py-6">
        <p className="relative mb-3 w-max text-2xl font-semibold text-white">
          Imagens da série
          <span className="absolute bottom-0 left-0 w-1/5 border" />
        </p>
        <section className="scrollImageContainer flex overflow-x-scroll rounded-md">
          {!!serieImages.length &&
            serieImages.slice(0, 11).map((image) => {
              return (
                <img
                  key={image.file_path}
                  alt="imagem de uma cena da série"
                  src={returnsMovieImageURL(500, image.file_path)}
                />
              )
            })}
        </section>
      </div>

      <div className="mx-auto w-[85%] py-6">
        <p className="relative mb-3 w-max text-2xl font-semibold text-white">
          Recomendaações
          <span className="absolute bottom-0 left-0 w-1/5 border" />
        </p>

        <section className="scrollImageContainer flex gap-4 overflow-x-scroll">
          {similarTvSeries.map((serie) => {
            return <TVSerieRecomendation key={serie.name} similarTvShowCard={serie} />
          })}
        </section>
      </div>
    </div>
  )
}
