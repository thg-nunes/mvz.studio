import Link from 'next/link'
import { Metadata } from 'next'

import { returnsMovieImageURL } from '@utils/movieImage'
import { useFetchTVSeasonDetails } from '@app/hooks/pages/detalhes/tv/season-details'

import { EpisodeDetails } from '@app/components/episode-details'

export type SeasonDetailsPageParams = {
  params: {
    tv_serie_id: string
    season_number: string
  }
}

export const generateMetadata = async ({
  params,
}: SeasonDetailsPageParams): Promise<Metadata> => {
  const { seasonDetails } = await useFetchTVSeasonDetails({ params })

  return {
    title: ' - ' + seasonDetails.name,
  }
}

export default async function SeasonDetails({
  params,
}: SeasonDetailsPageParams): Promise<JSX.Element> {
  const { seasonDetails, serieImages } = await useFetchTVSeasonDetails({ params })

  return (
    <div className="mx-auto w-[85%]">
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
      {seasonDetails.episodes?.map((ep) => (
        <Link
          key={ep.name}
          href={`/detalhes/tv/${params.tv_serie_id}/season/${params.season_number}/episode/${ep.episode_number}`}
        >
          <EpisodeDetails
            air_date={ep.air_date}
            episode_number={ep.episode_number}
            name={ep.name}
            overview={ep.overview}
            poster_path={ep.still_path}
            runtime={ep.runtime}
            vote_average={ep.vote_average}
          />
        </Link>
      ))}
    </div>
  )
}
