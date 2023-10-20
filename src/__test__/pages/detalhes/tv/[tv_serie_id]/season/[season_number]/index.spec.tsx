import { render, screen, waitFor } from '@testing-library/react'

import { useFetchTVSeasonDetails } from '@app/hooks/pages/detalhes/tv/season-details'
import SeasonDetails, {
  generateMetadata,
} from '@app/(pages)/detalhes/tv/[tv_serie_id]/season/[season_number]/page'

jest.mock('next/navigation')
jest.mock('@app/hooks/pages/detalhes/tv/season-details')

describe('<SeasonDetails />', () => {
  it('ensures that season details render correctly', async () => {
    const fake_episode_number = 123
    const params = {
      tv_serie_id: '12',
      season_number: '2',
    }

    global.fetch = jest.fn()

    jest.mocked(useFetchTVSeasonDetails).mockResolvedValue({
      serieImages: [
        {
          file_path: '/fake_file_path',
        },
      ],
      seasonDetails: {
        episodes: [
          {
            episode_number: fake_episode_number,
          },
        ],
      } as any,
    })

    render(await SeasonDetails({ params }))

    expect(screen.getAllByAltText('imagem de uma cena da série').length).toEqual(1)
    expect(screen.getByRole('link')).toHaveProperty(
      'href',
      `http://localhost/detalhes/tv/${params.tv_serie_id}/season/${params.season_number}/episode/${fake_episode_number}`
    )
  })

  it('ensures that the page title contains the season name', async () => {
    const fake_season_name = 'fake_season_name'
    const params = {
      tv_serie_id: '12',
      season_number: '2',
    }

    jest.mocked(useFetchTVSeasonDetails).mockResolvedValue({
      serieImages: [],
      seasonDetails: {
        name: fake_season_name,
      } as any,
    })

    const fake_response = await generateMetadata({ params })
    await waitFor(() => expect(useFetchTVSeasonDetails).toHaveBeenCalledWith({ params }))
    await waitFor(() =>
      expect(fake_response).toHaveProperty('title', ' - ' + fake_season_name)
    )
  })
})
