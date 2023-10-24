import { notFound } from 'next/navigation'

import { apiService } from '@app/services/api'

import { returnsMovieImageURL } from '@utils/movieImage'

import { EpisodeDetails } from '@app/components/episode-details'
import { GestStars } from './gestStar'

type EpisodeNumberDetailsPageProps = {
  params: {
    episode_number: string
    tv_serie_id: string
    season_number: string
  }
}

export default async function EpisodeNumberDetailsPage({
  params,
}: EpisodeNumberDetailsPageProps): Promise<JSX.Element> {
  const response = await apiService.fetchTVSeasonEpisodeDetails(params)
  const imagesResponse = await apiService.fetchTVSeasonEpisodeImages(params)

  if (!response.id) notFound()

  return (
    <div>
      <section>
        <EpisodeDetails
          air_date={response.air_date}
          episode_number={response.episode_number}
          name={response.name}
          overview={response.overview}
          poster_path={response.still_path}
          runtime={response.runtime}
          vote_average={response.vote_average}
        />
      </section>

      <div>
        <p className="mb-2 text-xl font-semibold text-white">Convidados:</p>
        <GestStars guest_stars={response.guest_stars} />
      </div>

      <div>
        <p className="mb-2 text-xl font-semibold text-white">Imagens do ep:</p>
        {!!imagesResponse.stills.length && (
          <img
            src={returnsMovieImageURL(500, response.still_path)}
            alt={`imagem que aparece em uma cena do episódio`}
            className="h-full max-h-24 w-full max-w-[180px] object-cover"
          />
        )}
      </div>
    </div>
  )
}
