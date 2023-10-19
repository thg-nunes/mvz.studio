export type MovieDTO = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type MovieDetailsDTO = Omit<MovieDTO, 'genre_ids'> & {
  genres: {
    id: number
    name: string
  }[]
  production_companies: {
    name: string
  }[]
  runtime: number
}

export type CarouselMoviePropsDTO = Pick<
  MovieDTO,
  'id' | 'title' | 'poster_path' | 'overview'
>

export type TopRatedTVShowsPropsDTO = Omit<
  MovieDTO,
  'video' | 'title' | 'release_date' | 'original_title' | 'adult'
> & {
  first_air_date: Date
  name: string
  origin_country: string[]
  original_name: string
}

export type ListTypeDTO = 'tv' | 'movie'

export type TVSerieDetails = Pick<
  MovieDTO,
  'adult' | 'overview' | 'backdrop_path' | 'id'
> & {
  episode_run_time: number[]
  first_air_date: string
  created_by: [
    {
      name: string
      profile_path: string
    },
  ]
  genres: {
    id: number
    name: string
  }[]
  in_production: boolean
  last_air_date: string
  last_episode_to_air: {
    id: number
    name: string
    air_date: Date
    episode_number: number
    episode_type: string
    runtime: number
    season_number: number
    show_id: number
  }
  name: string
  next_episode_to_air: {
    id: number
    name: string
    overview: string
    air_date: Date
    episode_number: number
    episode_type: string
    runtime: number
    season_number: number
    show_id: number
  }
  number_of_episodes: number
  number_of_seasons: number
  popularity: number
  seasons: {
    air_date: Date
    episode_count: number
    id: number
    name: string
    overview: string
    poster_path: string
    season_number: number
    vote_average: number
  }[]
  type: string
  vote_average: number
  vote_count: number
}

export type SimilarTvShowCardDTO = Pick<
  TVSerieDetails,
  'backdrop_path' | 'id' | 'first_air_date' | 'vote_average' | 'name'
>

export type SerieSeasonsDTO = {
  name: string
  poster_path: string
  air_date: string
  episode_count: number
  id: number
  overview: string
  season_number: number
  vote_average: number
}

export type SeasonEpisodeDetailsDTO = Pick<
  SerieSeasonsDTO,
  'air_date' | 'id' | 'name' | 'overview' | 'season_number'
> & {
  guest_stars: unknown[]
  episode_number: 892
  crew: {
    job: string
    department: string
    credit_id: string
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: null
  }[]
  production_code: string
  runtime: number
  still_path: string
  vote_average: number
  vote_counte: number
}

export type TVSerieImaesDTO = {
  file_path: string
}[]

export type TVSeasonDetailsDTO = Omit<SerieSeasonsDTO, 'episode_count'> & {
  episodes: {
    air_date: string
    episode_number: number
    episode_type: string
    id: number
    name: string
    overview: string
    production_code: string
    runtime: number
    season_number: number
    show_id: number
    still_path: string
    vote_average: number
    vote_count: number
  }[]
}
