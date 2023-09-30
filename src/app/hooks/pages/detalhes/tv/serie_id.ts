import { notFound } from 'next/navigation'

import { apiService } from '@app/services/api'
import { TVSerieDetails } from '@dtos/movie'

export const useFetchTVSerieDetails = async (
  tv_serie_id: string
): Promise<TVSerieDetails> => {
  const response = await apiService.fetchTvShowDetails(tv_serie_id)

  if (!response) {
    notFound()
  }

  response.last_air_date = new Date(response.last_air_date).toLocaleDateString()
  response.vote_count = parseInt(response.vote_count.toFixed(0))
  response.vote_average = parseInt(response.vote_average.toFixed(0)) * 10

  return response
}
