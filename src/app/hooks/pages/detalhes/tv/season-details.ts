import { notFound } from 'next/navigation'

import { TVSeasonDetailsDTO } from '@dtos/movie'

import { apiService } from '@app/services/api'
import { SeasonDetailsPageParams } from '@app/(pages)/detalhes/tv/[tv_serie_id]/season/[season_number]/page'

export const useFetchTVSeasonDetails = async (
  data: SeasonDetailsPageParams
): Promise<TVSeasonDetailsDTO> => {
  const seasonDetails = await apiService.fetchTVSeasonDetails(data)

  if (!seasonDetails.air_date) {
    notFound()
  }

  return seasonDetails
}
