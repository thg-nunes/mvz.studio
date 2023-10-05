import { notFound } from 'next/navigation'

import { apiService } from '@app/services/api'
import { useFetchSerieSeason } from '@app/hooks/pages/temporadas/[tv_serie_id]'
import { waitFor } from '@testing-library/react'
import { returnsDateInWriting } from '@utils/date-formate'

jest.mock('next/navigation')
jest.mock('@app/services/api')

describe('useFetchSerieSeason', () => {
  const fake_serie_season = {
    air_date: '2023-08-10',
    episode_count: 1,
    id: 1,
    vote_average: 8.8,
    name: 'fake_name',
    overview: 'fake_overview',
    poster_path: 'fake_poster_path',
    season_number: 1,
  }

  it('Ensures that the not-found function is called if the list with sesons data is empty', async () => {
    jest.mocked(apiService.fetchSerieSeason).mockResolvedValueOnce([])

    await useFetchSerieSeason('1')

    await waitFor(() => expect(notFound).toHaveBeenCalled())
  })

  it('Ensures that the air_date has a default value if your value of api is empty', async () => {
    jest.mocked(apiService.fetchSerieSeason).mockResolvedValueOnce([
      {
        ...fake_serie_season,
        air_date: '',
      },
    ])

    const response = await useFetchSerieSeason('1')

    await waitFor(() => expect(response[0].air_date).toEqual('Ano não informado'))
  })

  it('Ensures that the air_date has a wrriting date value if your value of api is valid', async () => {
    jest.mocked(apiService.fetchSerieSeason).mockResolvedValueOnce([fake_serie_season])

    const [year, month, day] = fake_serie_season.air_date.split('-')
    const writingDate = returnsDateInWriting(
      parseInt(year),
      parseInt(month, 10),
      parseInt(day, 10)
    )

    const response = await useFetchSerieSeason('1')

    await waitFor(() => expect(response[0].air_date).toEqual(writingDate))
  })
})
