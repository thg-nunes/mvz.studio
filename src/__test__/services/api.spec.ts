import { waitFor } from '@testing-library/react'

import { apiService } from '@app/services/api'
import { api_key, baseURL, fetchData } from '@app/services/fetch-data-config'

jest.mock('@app/services/fetch-data-config')
const fetchDataMock = fetchData as jest.Mock

const moviesList = [
  {
    adult: false,
    backdrop_path: '/55Rb9qt3yzyF4KQpC1c3T3Fbcao.jpg',
    genre_ids: [27, 53],
    id: 1008042,
    original_language: 'en',
    original_title: 'Talk to Me',
    overview:
      'When a group of friends discover how to conjure spirits using an embalmed hand, they become hooked on the new thrill, until one of them goes too far and unleashes terrifying supernatural forces.',
    popularity: 3538.457,
    poster_path: '/kdPMUMJzyYAc4roD52qavX0nLIC.jpg',
    release_date: '2023-07-26',
    title: 'Talk to Me',
    video: false,
    vote_average: 7.3,
    vote_count: 613,
  },
  {
    adult: false,
    backdrop_path: '/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg',
    genre_ids: [35, 12, 14],
    id: 346698,
    original_language: 'en',
    original_title: 'Barbie',
    overview:
      'Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.',
    popularity: 2820.205,
    poster_path: '/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
    release_date: '2023-07-19',
    title: 'Barbie',
    video: false,
    vote_average: 7.3,
    vote_count: 4668,
  },
  {
    adult: false,
    backdrop_path: '/4XM8DUTQb3lhLemJC51Jx4a2EuA.jpg',
    genre_ids: [28, 80, 53],
    id: 385687,
    original_language: 'en',
    original_title: 'Fast X',
    overview:
      "Over many missions and against impossible odds, Dom Toretto and his family have outsmarted, out-nerved and outdriven every foe in their path. Now, they confront the most lethal opponent they've ever faced: A terrifying threat emerging from the shadows of the past who's fueled by blood revenge, and who is determined to shatter this family and destroy everything—and everyone—that Dom loves, forever.",
    popularity: 2774.925,
    poster_path: '/fiVW06jE7z9YnO4trhaMEdclSiC.jpg',
    release_date: '2023-05-17',
    title: 'Fast X',
    video: false,
    vote_average: 7.3,
    vote_count: 3736,
  },
  {
    adult: false,
    backdrop_path: '/8pjWz2lt29KyVGoq1mXYu6Br7dE.jpg',
    genre_ids: [28, 878, 27],
    id: 615656,
    original_language: 'en',
    original_title: 'Meg 2: The Trench',
    overview:
      'An exploratory dive into the deepest depths of the ocean of a daring research team spirals into chaos when a malevolent mining operation threatens their mission and forces them into a high-stakes battle for survival.',
    popularity: 2429.447,
    poster_path: '/4m1Au3YkjqsxF8iwQy0fPYSxE0h.jpg',
    release_date: '2023-08-02',
    title: 'Meg 2: The Trench',
    video: false,
    vote_average: 7,
    vote_count: 1790,
  },
  {
    adult: false,
    backdrop_path: '/53z2fXEKfnNg2uSOPss2unPBGX1.jpg',
    genre_ids: [27, 9648, 53],
    id: 968051,
    original_language: 'en',
    original_title: 'The Nun II',
    overview:
      'In 1956 France, a priest is violently murdered, and Sister Irene begins to investigate. She once again comes face-to-face with a powerful evil.',
    popularity: 1849.236,
    poster_path: '/5gzzkR7y3hnY8AD1wXjCnVlHba5.jpg',
    release_date: '2023-09-06',
    title: 'The Nun II',
    video: false,
    vote_average: 6.6,
    vote_count: 211,
  },
  {
    adult: false,
    backdrop_path: '/c6Splshb8lb2Q9OvUfhpqXl7uP0.jpg',
    genre_ids: [28, 53],
    id: 717930,
    original_language: 'en',
    original_title: 'Kandahar',
    overview:
      'After his mission is exposed, an undercover CIA operative stuck deep in hostile territory in Afghanistan must fight his way out, alongside his Afghan translator, to an extraction point in Kandahar, all whilst avoiding elite enemy forces and foreign spies tasked with hunting them down.',
    popularity: 1824.055,
    poster_path: '/lCanGgsqF4xD2WA5NF8PWeT3IXd.jpg',
    release_date: '2023-05-25',
    title: 'Kandahar',
    video: false,
    vote_average: 6.8,
    vote_count: 498,
  },
]

describe('apiService', () => {
  it('Ensures that the fetchCarouselMovies service returns five objects contain id, title, overview and poster_path', async () => {
    fetchDataMock.mockImplementationOnce(() =>
      Promise.resolve({
        results: moviesList,
      })
    )

    const response = await apiService.fetchCarouselMovies()
    await waitFor(() => expect(response.length).toEqual(moviesList.length - 1))
  })

  it('Ensures that the fetchMoviesByGenre service returns a movies list per page', async () => {
    fetchDataMock.mockImplementationOnce(() =>
      Promise.resolve({
        results: moviesList,
      })
    )

    const page = 2
    const genreID = 52
    const requestCacheConfig = {
      next: {
        revalidate: 60 * 60 * 24 * 3, // 3 days
      },
    }
    const moviesOfANewPage = `with_genres=${genreID}&page=${page}`

    const response = await apiService.fetchMoviesByGenre({ page, genreID })

    await waitFor(() =>
      expect(fetchDataMock).toHaveBeenCalledWith(
        `/discover/movie`,
        requestCacheConfig,
        moviesOfANewPage
      )
    )

    await waitFor(() => expect(response).toEqual(moviesList))
  })

  it('Ensures that the fetchMovieDetailsById service get the infors of a movie by your id', async () => {
    const fakeMovieDetail = {
      adult: false,
      backdrop_path: '/55Rb9qt3yzyF4KQpC1c3T3Fbcao.jpg',
      id: 1008042,
      original_language: 'en',
      original_title: 'Talk to Me',
      overview:
        'When a group of friends discover how to conjure spirits using an embalmed hand, they become hooked on the new thrill, until one of them goes too far and unleashes terrifying supernatural forces.',
      popularity: 3538.457,
      poster_path: '/kdPMUMJzyYAc4roD52qavX0nLIC.jpg',
      release_date: '2023-07-26',
      title: 'Talk to Me',
      video: false,
      vote_average: 7.3,
      vote_count: 613,
      genres: [
        {
          id: 123,
          name: 'fake_genre',
        },
      ],
      production_companies: [
        {
          name: 'fake_production_companie',
        },
      ],
      runtime: 150,
    }

    fetchDataMock.mockResolvedValueOnce(fakeMovieDetail)

    const fakeMovieDetailResponse = await apiService.fetchMovieDetailsById('82')

    await waitFor(() => expect(fakeMovieDetailResponse).toEqual(fakeMovieDetail))
  })

  it('Ensures that the fetchMovieVideoById service get the infors of a movie video by your id', async () => {
    fetchDataMock.mockResolvedValueOnce({
      results: [
        {
          key: 'fake_movie_video_key',
        },
      ],
    })

    const fake_movie_video_key = await apiService.fetchMovieVideoById('82')

    await waitFor(() =>
      expect(fake_movie_video_key.results[0]).toEqual({ key: 'fake_movie_video_key' })
    )
  })

  it('Ensures that the fetchMoviesById service get the infors of many movies by your id', async () => {
    const fakeMoviesIds = [1, 2, 3]

    apiService.fetchMoviesById(fakeMoviesIds)

    await waitFor(() => expect(fetchData).toHaveBeenCalledTimes(3))
  })

  it('Ensures that the service to get the popular movies execute with the correct endpoint', async () => {
    fetchDataMock.mockImplementation(() => {
      return Promise.resolve({ results: [] })
    })

    await apiService.fetchPopularMovies()

    await waitFor(() =>
      expect(fetchDataMock).toHaveBeenCalledWith(`/movie/popular`, {
        next: {
          revalidate: 60 * 60 * 24 * 3, // 3 days
        },
      })
    )
  })

  it('Ensures that the service to get top rated tv shows execute with the correct endpoint', async () => {
    fetchDataMock.mockImplementation(() => {
      return Promise.resolve({ results: [] })
    })

    await apiService.fetchTopRatedTvShows()

    await waitFor(() =>
      expect(fetchDataMock).toHaveBeenCalledWith(`/tv/top_rated`, {
        next: {
          revalidate: 60 * 60 * 24 * 3, // 3 days
        },
      })
    )
  })

  it('Ensures that the service to get debut tv shows execute with the correct endpoint', async () => {
    fetchDataMock.mockImplementation(() => {
      return Promise.resolve({ results: [] })
    })

    await apiService.fetchDebutTvShows()

    await waitFor(() =>
      expect(fetchDataMock).toHaveBeenCalledWith(`/tv/airing_today`, {
        next: {
          revalidate: 60 * 60 * 24 * 3, // 3 days
        },
      })
    )
  })

  it('Ensures that the service to get the tv show details with the correct endpoint', async () => {
    const fake_response = {
      movieDetails: 'fake_detail',
    }
    fetchDataMock.mockImplementationOnce(() => Promise.resolve(fake_response))

    const fakeId = '123'
    const response = await apiService.fetchTvShowDetails(fakeId)

    await waitFor(() =>
      expect(fetchDataMock).toHaveBeenCalledWith('/tv/' + fakeId, {
        next: {
          revalidate: 60 * 60 * 24 * 3, // 3 days
        },
      })
    )
    await waitFor(() => expect(response).toEqual(fake_response))
  })

  it('Ensures that the service to get the similar tv shows list with the correct endpoint', async () => {
    const fake_response = [
      {
        backdrop_path: 'fake_backdrop_path1',
        id: 123,
        first_air_date: 'fake_first_air_date1',
        vote_average: 8.8,
        name: 'fake_name1',
      },
      {
        backdrop_path: 'fake_backdrop_path2',
        id: 223,
        first_air_date: 'fake_first_air_date2',
        vote_average: 8.3,
        name: 'fake_name2',
      },
    ]

    fetchDataMock.mockImplementationOnce(() =>
      Promise.resolve({ results: fake_response })
    )

    const fakeId = '123'
    const response = await apiService.fetchSimilarTvShow(fakeId)

    await waitFor(() =>
      expect(fetchDataMock).toHaveBeenCalledWith(`/tv/${fakeId}/similar`, {
        next: {
          revalidate: 60 * 60 * 24 * 3, // 3 days
        },
      })
    )
    await waitFor(() => expect(response.length).toEqual(2))
  })

  it('Ensures that the service to get the list of paths of images of one tv show with the correct endpoint', async () => {
    const fake_response = [
      {
        file_path: 'fake_file_path1',
      },
      { file_path: 'fake_file_path2' },
      { file_path: 'fake_file_path3' },
    ]

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ backdrops: fake_response }),
    })

    const fakeId = '123'
    const endpoint = `${baseURL}/tv/${fakeId}/images?&api_key=${api_key}`
    const { backdrops } = await apiService.fetchTvShowImages(fakeId)

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(endpoint, {
        next: {
          revalidate: 60 * 60 * 24 * 3, // 3 days
        },
      })
    )
    await waitFor(() => expect(backdrops.length).toEqual(3))
  })

  it('Ensures that the service to get the seasons of one serie with the correct endpoint', async () => {
    const fake_response = [
      {
        name: 'fake_season_name',
        poster_path: 'fake_poster_path',
        air_date: 'fake_air_date',
        episode_count: 1,
        id: 123,
        overview: 'fake_overview',
        season_number: 1,
        vote_average: 8.8,
      },
    ]

    fetchDataMock.mockImplementationOnce(() =>
      Promise.resolve({ seasons: fake_response })
    )

    const fakeId = '123'
    const endpoint = `/tv/${fakeId}`
    const response = await apiService.fetchSerieSeason(fakeId)

    await waitFor(() =>
      expect(fetchDataMock).toHaveBeenCalledWith(
        endpoint,
        {
          next: {
            revalidate: 60 * 60 * 24 * 3, // 3 days
          },
        },
        'append_to_response=seasons'
      )
    )
    await waitFor(() => expect(response.length).toEqual(fake_response.length))
  })

  it('Ensures that the service to get the details of one season of one serie with the correct endpoint', async () => {
    const season_number = '1'
    const fake_response = {
      name: 'fake_name',
      poster_path: 'fake_poster_path',
      air_date: 'fake_air_date',
      id: 123,
      overview: 'fake_overview',
      season_number: 1,
      vote_average: 8,
      episodes: {
        air_date: 'fake_episodes',
        episode_number: 1,
        episode_type: 'fake_episode_type',
        id: 123,
        name: 'fake_name',
        overview: 'fake_overview',
        production_code: 'fake_production_code',
        runtime: 150,
        season_number: 1,
        show_id: 159638,
        still_path: 'fake_still_path',
        vote_average: 8,
        vote_count: 5953,
      },
    }

    fetchDataMock.mockImplementationOnce(() => Promise.resolve(fake_response))

    const fakeId = '123'
    const endpoint = `/tv/${fakeId}/season/${season_number}`
    const response = await apiService.fetchTVSeasonDetails({
      params: {
        tv_serie_id: fakeId,
        season_number,
      },
    })

    await waitFor(() =>
      expect(fetchDataMock).toHaveBeenCalledWith(endpoint, {
        next: {
          revalidate: 60 * 60 * 24 * 3, // 3 days
        },
      })
    )
    await waitFor(() => expect(response).toEqual(fake_response))
  })

  it('Ensures that the service to get the details of one episode of one season serie execute with the correct endpoint', async () => {
    const season_number = '1'
    const episode_number = '123'
    const fake_response = {
      air_date: '2019-07-07',
      id: 1817016,
      episode_number: 892,
      name: 'Wano, o País dos Samurais Onde Flutuam as Pétalas de Cerejeira!',
      overview:
        'Os Chapéus de Palha finalmente se reúnem no País de Wano! Formidáveis inimigos os aguardam nesta terra de guerreiros onde nem a Marinha ousa pisar! Uma batalha sem precedentes começa agora!',
      season_number: 21,
      guest_stars: [],
      crew: [
        {
          job: 'Key Animation',
          department: 'Visual Effects',
          credit_id: '6069cc340c3ec800409a2b28',
          adult: false,
          gender: 0,
          id: 2896194,
          known_for_department: 'Visual Effects',
          name: 'Tu Yong-ce',
          original_name: 'Tu Yong-ce',
          popularity: 0.98,
          profile_path: null,
        },
      ],
      production_code: '892',
      runtime: 24,
      still_path: '/9oB1yvaCs1t6TCxcdYvYHNcobpt.jpg',
      vote_average: 9.3,
      vote_count: 3,
    }

    fetchDataMock.mockImplementationOnce(() => Promise.resolve(fake_response))

    const fakeId = '123'
    const endpoint = `/tv/${fakeId}/season/${season_number}/episode/${episode_number}`
    const response = await apiService.fetchTVSeasonEpisodeDetails({
      season_number,
      tv_serie_id: fakeId,
      episode_number,
    })

    await waitFor(() =>
      expect(fetchDataMock).toHaveBeenCalledWith(endpoint, {
        next: {
          revalidate: 60 * 60 * 24 * 3, // 3 days
        },
      })
    )
    await waitFor(() => expect(response).toEqual(fake_response))
  })
})
