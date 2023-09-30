import { returnsMovieImageURL } from '@utils/movieImage'
import { useFetchTVSerieDetails } from '@app/hooks/pages/detalhes/tv/serie_id'

import { SerieDetails } from './serieDetails'

export default async function TvSerieDetailsById({
  params,
}: {
  params: { tv_serie_id: string }
}) {
  const response = await useFetchTVSerieDetails(params.tv_serie_id)

  return (
    <div className="">
      <div className="relative h-[450px]">
        <img
          src={returnsMovieImageURL(500, response.backdrop_path)}
          alt={`imagem do filme ${response.name}`}
          className="carouselElement h-full w-full object-cover"
        />
        <section className="absolute left-0 top-0 flex h-full w-full items-center gap-4 bg-black/70 px-3">
          <img
            src={returnsMovieImageURL(500, response.backdrop_path)}
            alt={`imagem do filme ${response.name}`}
            className="carouselElement h-3/4 w-1/4 rounded-lg object-cover"
          />
          <SerieDetails serieData={response} />
        </section>
      </div>
    </div>
  )
}
