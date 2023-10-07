import { render, screen, waitFor } from '@testing-library/react'

import { apiService } from '@app/services/api'
import {
  useFetchSimilarTVSeries,
  useFetchTVSerieDetails,
} from '@app/hooks/pages/detalhes/tv/serie_id'
import TvSerieDetailsById, {
  generateMetadata,
} from '@app/(pages)/detalhes/tv/[tv_serie_id]/page'

jest.mock('@app/services/api')

jest.mock('@app/hooks/pages/detalhes/tv/serie_id')
const useFetchTVSerieDetailsMock = useFetchTVSerieDetails as jest.Mock
const useFetchSimilarTVSeriesMock = useFetchSimilarTVSeries as jest.Mock

describe('<TvSerieDetailsById />', () => {
  it('ensures that the metadata function fetch the serieDetails and return the title of page with the serie name', async () => {
    const fake_serie_id = {
      tv_serie_id: '123',
    }

    useFetchTVSerieDetailsMock.mockResolvedValue({
      serieDetails: {
        name: 'any_name',
        seasons: [],
      },
    })

    const metadata = await generateMetadata({
      params: fake_serie_id,
    })

    await waitFor(() => expect(metadata).toEqual({ title: ' - any_name' }))
  })

  it('ensures that the page call the correct hooks to get the serie details', async () => {
    const fake_serie_id = {
      tv_serie_id: '123',
    }

    const fake_serie_details = {
      episode_run_time: [12, 24],
      first_air_date: '2020-08-15',
      genres: [
        {
          id: 1,
          name: 'any_genre_1',
        },
        {
          id: 2,
          name: 'any_genre_2',
        },
      ],
      adult: false,
      overview: 'fake_overview',
      backdrop_path: 'fake_backdrop_path',
      id: 1234,
      in_production: true,
      last_air_date: '2024-08-18',
      last_episode_to_air: {
        id: 32,
        name: 'any_ep_name',
        air_date: new Date(2024, 8, 18),
        episode_number: 35,
        episode_type: 'any_type',
        runtime: 15,
        season_number: 2,
        show_id: 854893,
      },
      name: 'any_name',
      next_episode_to_air: {
        id: 1478,
        name: 'next_ep',
        overview: 'next ep overview',
        air_date: new Date(2024, 9, 29),
        episode_number: 4,
        episode_type: 'any_type',
        runtime: 10,
        season_number: 3,
        show_id: 1596,
      },
      number_of_episodes: 132,
      number_of_seasons: 5,
      popularity: 123456,
      seasons: [
        {
          air_date: new Date(2020, 1, 12),
          episode_count: 32,
          id: 159,
          name: 'any_season_name',
          overview: 'any season overview',
          poster_path: 'any_season_poster_path',
          season_number: 1,
          vote_average: 1532,
        },
      ],
      type: 'any_type',
      vote_average: 12345,
      vote_count: 123,
    }

    jest.mocked(apiService.fetchTvShowDetails).mockResolvedValue({
      ...fake_serie_details,
      created_by: [
        {
          name: 'any_name',
          profile_path: 'fake_profile_path',
        },
      ],
    })

    jest.mocked(apiService.fetchTvShowImages).mockResolvedValue({
      backdrops: [
        { file_path: 'file_path1' },
        { file_path: 'file_path1' },
        { file_path: 'file_path3' },
      ],
    })

    useFetchTVSerieDetailsMock.mockResolvedValue({
      serieDetails: {
        name: 'any_name',
        seasons: [],
        last_air_date: '2022-08-15',
        genres: [],
        created_by: [],
        number_of_episodes: 123,
      },
      serieImages: [],
    })

    useFetchSimilarTVSeriesMock.mockResolvedValue({
      similarTvSeries: [
        {
          backdrop_path: 'similar_serie_backdrop_path',
          id: 1221,
          first_air_date: '2021-05-12',
          vote_average: 8.8,
          name: 'similar_serie_name',
        },
      ],
    })

    render(await TvSerieDetailsById({ params: fake_serie_id }))

    await waitFor(() =>
      expect(
        screen.getByText(`Temporada ${fake_serie_details.seasons.pop()?.season_number}`)
      ).toBeInTheDocument()
    )

    await waitFor(() => expect(screen.getByText(/episódios/gi)).toBeInTheDocument())
  })
})
