import { notFound } from 'next/navigation'

import { apiService } from '@app/services/api'
import { useFetchSerieSeason } from '@app/hooks/pages/temporadas/[tv_serie_id]'
import { waitFor } from '@testing-library/react'

jest.mock('next/navigation')
jest.mock('@app/services/api')

describe('useFetchSerieSeason', () => {
  const fake_serie_season = {
    air_date: 'fake_air_date',
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
})
