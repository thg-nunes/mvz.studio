import { render, waitFor } from '@testing-library/react'

import { useFetchSerieSeason } from '@app/hooks/pages/temporadas/[tv_serie_id]'
import TVSerieSeasons from '@app/(pages)/detalhes/tv/temporadas/[serie_id]/page'

jest.mock('@app/hooks/pages/temporadas/[tv_serie_id]')

describe('<TVSerieSeasons />', () => {
  it('ensures that the page fetch and render the season details', async () => {
    const fake_serie_season = { serie_id: '1' }
    const fake_season_response = {
      air_date: '2015-08-20',
      episode_count: 10,
      id: 1,
      debutYear: '2015',
      name: 'Season 1',
      overview: 'fake_overview',
      poster_path: 'fake_poster_path',
      season_number: 1,
      vote_average: 8.8,
    }

    jest.mocked(useFetchSerieSeason).mockResolvedValueOnce([fake_season_response])

    render(await TVSerieSeasons({ params: fake_serie_season }))

    await waitFor(() =>
      expect(useFetchSerieSeason).toHaveBeenCalledWith(fake_serie_season.serie_id)
    )
  })
})
