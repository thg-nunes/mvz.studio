import { apiService } from '@app/services/api'
import { returnsDateInWriting } from '@utils/date-formate'
import { notFound } from 'next/navigation'

export const useFetchSerieSeason = async (tv_serie_id: string) => {
  const response = await apiService.fetchSerieSeason(tv_serie_id)

  if (!response.length) {
    return notFound()
  }

  const seasonsDetails = response.map((season) => {
    let debutYear: string = 'Ano não informado'

    if (season.air_date) {
      const [year, month, day] = season.air_date.split('-')

      debutYear = season.air_date.split('-')[0]

      season.air_date = returnsDateInWriting(
        parseInt(year),
        parseInt(month, 10),
        parseInt(day, 10)
      )
    }

    if (!season.air_date) {
      season.air_date = 'Ano não informado'
    }

    const overview = season.overview
      ? season.overview.slice(0, 381)
      : 'Esta série não contém um overview escrito.'

    return {
      ...season,
      debutYear,
      overview,
    }
  })

  return seasonsDetails
}
