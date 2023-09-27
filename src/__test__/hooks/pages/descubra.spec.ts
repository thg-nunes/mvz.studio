import { waitFor } from '@testing-library/react'

import { apiService } from '@app/services/api'

import { useFetchMoviesToDiscoverPage } from '@app/hooks/pages/descubra'

jest.mock('@app/services/api')

describe('@hooks/pages/descubra', () => {
  it('Ensures that the hook useFetchMoviesToDiscoverPage return 3 movies list to render in discover page', async () => {
    const response = await useFetchMoviesToDiscoverPage()

    expect(apiService.fetchPopularMovies).toHaveBeenCalled()
    expect(apiService.fetchTopRatedTvShows).toHaveBeenCalled()
    expect(apiService.fetchDebutTvShows).toHaveBeenCalled()
    await waitFor(() => expect(response.length).toEqual(3))
  })
})
