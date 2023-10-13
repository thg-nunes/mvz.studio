import { notFound } from 'next/navigation'

import { TVSeasonDetailsDTO, TVSerieImaesDTO } from '@dtos/movie'

import { apiService } from '@app/services/api'
import { SeasonDetailsPageParams } from '@app/(pages)/detalhes/tv/[tv_serie_id]/season/[season_number]/page'
import { returnsDateInWriting } from '@utils/date-formate'

export const useFetchTVSeasonDetails = async (
  data: SeasonDetailsPageParams
): Promise<{ seasonDetails: TVSeasonDetailsDTO; serieImages: TVSerieImaesDTO }> => {
  const seasonDetails = await apiService.fetchTVSeasonDetails(data)
  const { backdrops: serieImages } = await apiService.fetchTvShowImages(
    data.params.tv_serie_id
  )

  if (!seasonDetails.air_date) {
    notFound()
  }

  seasonDetails.vote_average = parseFloat(seasonDetails.vote_average.toFixed(1))

  seasonDetails.episodes = seasonDetails.episodes.map((ep) => {
    const [year, month, day] = ep.air_date.split('-')
    const _year = parseInt(year)
    const _month = parseInt(month)
    const _day = parseInt(day)

    ep.overview = ep.overview ? ep.overview : 'Este ep não contém um overview formado.'

    return {
      ...ep,
      air_date: returnsDateInWriting(_year, _month, _day),
    }
  })

  return { seasonDetails, serieImages }
}
