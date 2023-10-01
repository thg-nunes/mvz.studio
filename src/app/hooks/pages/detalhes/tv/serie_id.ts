import { notFound } from 'next/navigation'

import { apiService } from '@app/services/api'
import { TVSerieDetails, TVSerieImaesDTO } from '@dtos/movie'

export const useFetchTVSerieDetails = async (
  tv_serie_id: string
): Promise<{ serieDetails: TVSerieDetails; serieImages: TVSerieImaesDTO }> => {
  const serieDetails = await apiService.fetchTvShowDetails(tv_serie_id)
  const { backdrops: serieImages } = await apiService.fetchTvShowImages(tv_serie_id)

  if (!serieDetails) {
    notFound()
  }

  serieDetails.last_air_date = new Date(serieDetails.last_air_date).toLocaleDateString()
  serieDetails.vote_count = parseInt(serieDetails.vote_count.toFixed(0))
  serieDetails.vote_average = parseInt(serieDetails.vote_average.toFixed(0)) * 10

  return { serieDetails, serieImages }
}
