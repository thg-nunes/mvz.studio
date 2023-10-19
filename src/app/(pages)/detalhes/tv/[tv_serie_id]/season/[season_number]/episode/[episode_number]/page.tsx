import { EpisodeDetails } from '@app/components/episode-details'
import { apiService } from '@app/services/api'
import { returnsMovieImageURL } from '@utils/movieImage'
import { notFound } from 'next/navigation'

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

  if (!response.id) notFound()

  return (
    <div>
      <img
        src={returnsMovieImageURL(500, response.still_path)}
        alt={`imagem do filme ${response.name}`}
        className="carouselElement h-full w-full object-cover"
      />
      <EpisodeDetails
        air_date={response.air_date}
        episode_number={response.episode_number}
        name={response.name}
        overview={response.overview}
        poster_path={response.still_path}
        runtime={response.runtime}
        vote_average={response.vote_average}
      />
    </div>
  )
}
