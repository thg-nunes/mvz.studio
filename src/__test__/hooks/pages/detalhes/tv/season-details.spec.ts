import { notFound } from 'next/navigation'
import { waitFor } from '@testing-library/react'

import { apiService } from '@app/services/api'
import { useFetchTVSeasonDetails } from '@app/hooks/pages/detalhes/tv/season-details'

jest.mock('next/navigation')
jest.mock('@app/services/api')

describe('useFetchTVSeasonDetails', () => {
  it('ensures that the notFound function is called if the fetch of one season details not returns data', async () => {
    const fake_params = {
      params: {
        tv_serie_id: '1',
        season_number: '22',
      },
    }

    global.fetch = jest.fn()

    jest.mocked(apiService.fetchTVSeasonDetails).mockResolvedValue({
      air_date: '',
      episodes: [],
      id: 0,
      name: '',
      overview: '',
      poster_path: '',
      season_number: 0,
      vote_average: 0,
    })

    await useFetchTVSeasonDetails(fake_params)

    await waitFor(() => expect(notFound).toHaveBeenCalled())
  })

  it('ensures that the on fetch of one season details the returns data', async () => {
    const fake_params = {
      params: {
        tv_serie_id: '1',
        season_number: '22',
      },
    }

    global.fetch = jest.fn()

    jest.mocked(apiService.fetchTvShowImages).mockResolvedValue({
      backdrops: [],
    })

    jest.mocked(apiService.fetchTVSeasonDetails).mockResolvedValue({
      air_date: '2020-08-20',
      episodes: [],
      id: 10,
      name: 'any_name',
      overview: 'any_overview',
      poster_path: 'any_poster_path',
      season_number: 320,
      vote_average: 7.0,
    })

    await useFetchTVSeasonDetails(fake_params)

    await waitFor(() => expect(notFound).not.toHaveBeenCalled())
  })

  it('ensures that notfound function is called if datails of season is not found', async () => {
    const fake_params = {
      params: {
        tv_serie_id: '1',
        season_number: '22',
      },
    }

    global.fetch = jest.fn()

    jest.mocked(apiService.fetchTvShowImages).mockResolvedValue({
      backdrops: [],
    })

    jest.mocked(apiService.fetchTVSeasonDetails).mockResolvedValue({} as any)

    await useFetchTVSeasonDetails(fake_params)

    await waitFor(() => expect(notFound).toHaveBeenCalled())
  })

  it('ensures that the hook returns data correct', async () => {
    const fake_params = {
      params: {
        tv_serie_id: '1',
        season_number: '22',
      },
    }

    global.fetch = jest.fn()

    jest.mocked(apiService.fetchTvShowImages).mockResolvedValue({
      backdrops: [],
    })

    jest.mocked(apiService.fetchTVSeasonDetails).mockResolvedValue({
      episodes: [
        {
          air_date: '2015-08-22',
          overview: 'fake overview',
        },
      ],
    } as any)

    const { seasonDetails } = await useFetchTVSeasonDetails(fake_params)

    await waitFor(() =>
      expect(seasonDetails.episodes[0].overview).toEqual('fake overview')
    )

    await waitFor(() =>
      expect(seasonDetails.episodes[0].air_date).toContain('de setembro 2015')
    )
  })

  it('ensures that the hook returns one default message if overview does not exists', async () => {
    const fake_params = {
      params: {
        tv_serie_id: '1',
        season_number: '22',
      },
    }

    global.fetch = jest.fn()

    jest.mocked(apiService.fetchTvShowImages).mockResolvedValue({
      backdrops: [],
    })

    jest.mocked(apiService.fetchTVSeasonDetails).mockResolvedValue({
      episodes: [
        {
          air_date: '2015-08-22',
          overview: '',
        },
      ],
    } as any)

    const { seasonDetails } = await useFetchTVSeasonDetails(fake_params)

    await waitFor(() =>
      expect(seasonDetails.episodes[0].overview).toEqual(
        'Este ep não contém um overview formado.'
      )
    )
  })
})
