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
