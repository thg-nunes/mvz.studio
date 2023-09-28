import { MovieDTO, TopRatedTVShowsPropsDTO } from '@dtos/movie'

export const convertTvShowListToMovieDTOList = (
  tvShowList: TopRatedTVShowsPropsDTO[]
): MovieDTO[] => {
  return tvShowList.map((tvShow) => {
    return {
      ...tvShow,
      adult: false,
      video: false,
      release_date: new Date(tvShow.first_air_date).toISOString(),
      title: tvShow.name,
      original_title: tvShow.original_name,
    }
  })
}
