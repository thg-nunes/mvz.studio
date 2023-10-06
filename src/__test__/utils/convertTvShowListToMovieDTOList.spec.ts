import { convertTvShowListToMovieDTOList } from '@utils/convertTvShowListToMovieDTOList'

describe('convertTvShowListToMovieDTOList', () => {
  it('ensures that the util to convert one TopRatedTVShows list to MovieDTO list execute correctly', () => {
    const fake_list_top_rated_tv_show = [
      {
        first_air_date: new Date(2020, 10, 30),
        name: 'fake_name',
        origin_country: ['fake_country1', 'fake_country2'],
        original_name: 'fake_original_name',
        backdrop_path: 'fake_backdrop_path',
        genre_ids: [1, 2, 3],
        id: 123,
        original_language: 'fake_language',
        overview: 'fake_overview',
        popularity: 15320,
        poster_path: 'fake_poster_path',
        vote_average: 1320,
        vote_count: 8.8,
      },
    ]
    const response = convertTvShowListToMovieDTOList(fake_list_top_rated_tv_show)

    expect(response[0].adult).toEqual(false)
    expect(response[0].video).toEqual(false)
    expect(response[0].title).toEqual(fake_list_top_rated_tv_show[0].name)
    expect(response[0].original_title).toEqual(
      fake_list_top_rated_tv_show[0].original_name
    )
    expect(response[0].release_date).toEqual(
      new Date(fake_list_top_rated_tv_show[0].first_air_date).toLocaleDateString()
    )
  })
})
