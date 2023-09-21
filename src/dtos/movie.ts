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
  runtime: 150
}

export type CarouselMoviePropsDTO = Pick<
  MovieDTO,
  'id' | 'title' | 'poster_path' | 'overview'
>
