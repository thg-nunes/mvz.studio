import { notFound } from 'next/navigation'
import { waitFor } from '@testing-library/react'

import { apiService } from '@app/services/api'
import {
  useFetchSimilarTVSeries,
  useFetchTVSerieDetails,
} from '@app/hooks/pages/detalhes/tv/serie_id'

jest.mock('next/navigation')
jest.mock('@app/services/api')

describe('@app/hooks/pages/detalhes/tv/serie_id', () => {
  it('ensures that the hook useFetchTVSerieDetails returns the correct data when a valid tv serie id is provided', async () => {
    const fake_tv_serie_id = '123'
    const fake_serie_images_paths = [
      {
        file_path: 'fake_file_path1',
      },
      {
        file_path: 'fake_file_path2',
      },
      {
        file_path: 'fake_file_path3',
      },
    ]
    const fake_tv_show_details = {
      last_air_date: '2018-09-20',
      vote_count: 1532.18,
      vote_average: 8.2,
    }

    apiService.fetchTvShowDetails = jest.fn().mockResolvedValueOnce(fake_tv_show_details)

    jest.mocked(apiService.fetchTvShowImages).mockResolvedValueOnce({
      backdrops: fake_serie_images_paths,
    })

    const { serieDetails, serieImages } = await useFetchTVSerieDetails(fake_tv_serie_id)

    await waitFor(() =>
      expect(apiService.fetchTvShowDetails).toHaveBeenCalledWith(fake_tv_serie_id)
    )

    await waitFor(() =>
      expect(apiService.fetchTvShowImages).toHaveBeenCalledWith(fake_tv_serie_id)
    )

    await waitFor(() =>
      expect(serieImages.length).toEqual(fake_serie_images_paths.length)
    )

    await waitFor(() => expect(serieDetails).toEqual(fake_tv_show_details))
  })

  it('ensures that the notFound function is called when a not valid tv serie id is provided', async () => {
    const fake_tv_serie_id = '123'
    const fake_serie_images_paths = [
      {
        file_path: 'fake_file_path1',
      },
      {
        file_path: 'fake_file_path2',
      },
      {
        file_path: 'fake_file_path3',
      },
    ]
    const fake_tv_show_details = null

    apiService.fetchTvShowDetails = jest.fn().mockResolvedValueOnce(fake_tv_show_details)

    jest.mocked(apiService.fetchTvShowImages).mockResolvedValueOnce({
      backdrops: fake_serie_images_paths,
    })

    await useFetchTVSerieDetails(fake_tv_serie_id)

    await waitFor(() => expect(notFound).toHaveBeenCalled())
  })

  it('ensures that the notFound function is called when a not valid tv serie id is provided to fetch similar series', async () => {
    const fake_tv_serie_id = '123'
    const fake_tv_show_details = null

    apiService.fetchSimilarTvShow = jest.fn().mockResolvedValueOnce(fake_tv_show_details)

    await useFetchSimilarTVSeries(fake_tv_serie_id)

    await waitFor(() =>
      expect(apiService.fetchSimilarTvShow).toHaveBeenCalledWith(fake_tv_serie_id)
    )

    await waitFor(() => expect(notFound).toHaveBeenCalled())
  })

  it('ensures that the hook useFetchSimilarTVSeries returns the correct data if a valid tv serie id is provided', async () => {
    const fake_tv_serie_id = '123'
    const fake_tv_show_similar = {
      backdrop_path: 'fake_backdrop_path',
      id: 1,
      first_air_date: '2018-09-20',
      vote_average: 8.8,
      name: 'large_serie_name',
    }

    jest
      .mocked(apiService.fetchSimilarTvShow)
      .mockResolvedValueOnce([fake_tv_show_similar])

    const { similarTvSeries } = await useFetchSimilarTVSeries(fake_tv_serie_id)

    await waitFor(() =>
      expect(similarTvSeries[0].name).toEqual(
        similarTvSeries[0].name.slice(0, 10) + '...'
      )
    )

    await waitFor(() => expect(similarTvSeries[0].vote_average).toEqual(88))
  })

  it('ensures that the hook useFetchSimilarTVSeries returns default value to first_air_date if null', async () => {
    const default_air_date_value = 'sem data'
    const fake_tv_serie_id = '123'
    const fake_tv_show_similar = {
      backdrop_path: 'fake_backdrop_path',
      id: 1,
      first_air_date: '',
      vote_average: 8.8,
      name: 'large_serie_name',
    }

    jest
      .mocked(apiService.fetchSimilarTvShow)
      .mockResolvedValueOnce([fake_tv_show_similar])

    const { similarTvSeries } = await useFetchSimilarTVSeries(fake_tv_serie_id)

    await waitFor(() =>
      expect(similarTvSeries[0].first_air_date).toEqual(default_air_date_value)
    )
  })
})
