import { render, screen, waitFor } from '@testing-library/react'

import { useFetchMoviesToDiscoverPage } from '@app/hooks/pages/descubra'
import DiscoverPage from '@app/(pages)/descubra/page'
import { moviesList } from '../hooks/moviesList.spec'
import { apiService } from '@app/services/api'

jest.mock('@app/services/api')
jest.mock('@app/hooks/pages/descubra')

describe('<DiscoverPage />', () => {
  it('Ensures that the discover page render the content expected', async () => {
    jest.mocked(apiService.fetchPopularMovies).mockResolvedValue({
      results: moviesList.slice(0, 2),
    })
    jest.mocked(apiService.fetchTopRatedTvShows).mockResolvedValue({
      results: moviesList.slice(2, 4),
    })
    jest.mocked(apiService.fetchDebutTvShows).mockResolvedValue({
      results: moviesList.slice(4, 6),
    })

    jest
      .mocked(useFetchMoviesToDiscoverPage)
      .mockResolvedValue([
        { results: moviesList.slice(0, 2) },
        { results: moviesList.slice(2, 4) },
        { results: moviesList.slice(4, 6) },
      ])

    render(await DiscoverPage())

    await waitFor(() => expect(useFetchMoviesToDiscoverPage).toHaveBeenCalledTimes(1))

    await waitFor(() => expect(screen.getByText('Filmes Populares')).toBeInTheDocument())
    await waitFor(() => expect(screen.getByText('Séries de Tv')).toBeInTheDocument())
    await waitFor(() =>
      expect(screen.getByText('Estréia essa semana')).toBeInTheDocument()
    )
  })
})
