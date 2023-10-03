import { notFound } from 'next/navigation'

import { apiService } from '@app/services/api'
import { SimilarTvShowCardDTO, TVSerieDetails, TVSerieImaesDTO } from '@dtos/movie'

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

export const useFetchSimilarTVSeries = async (
  tv_serie_id: string
): Promise<{ similarTvSeries: SimilarTvShowCardDTO[] }> => {
  const similarTvSeries = await apiService.fetchSimilarTvShow(tv_serie_id)

  if (!similarTvSeries) {
    notFound()
  }

  const listUpdated = similarTvSeries.map((serie) => {
    return {
      ...serie,
      first_air_date: serie.first_air_date ? serie.first_air_date : 'sem data',
      name: serie.name.slice(0, 10) + '...',
      vote_average: parseInt((serie.vote_average * 10).toFixed(0)),
    }
  })

  return { similarTvSeries: listUpdated }
}
