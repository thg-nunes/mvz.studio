import { notFound } from 'next/navigation'
import { waitFor } from '@testing-library/react'

import { apiService } from '@app/services/api'
import { useFetchTVSerieDetails } from '@app/hooks/pages/detalhes/tv/serie_id'

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
})
