import { ListTypeDTO, MovieDTO } from '@dtos/movie'
import { MovieCard } from '../movieCard'

export type MovieListSectionProps = {
  listType: ListTypeDTO
  showMoviesLength: number
  listMovies: MovieDTO[]
}

export const MovieListSection = ({
  listType,
  listMovies,
  showMoviesLength,
}: MovieListSectionProps): JSX.Element => {
  return (
    <section className="flex flex-wrap justify-between gap-y-6">
      {listMovies
        .slice(0, showMoviesLength)
        .map(({ id, overview, poster_path, title, vote_average }) => (
          <MovieCard
            key={id}
            movie_id={id}
            listType={listType}
            movieDescription={overview}
            moviePathImage={poster_path}
            movieTitle={title}
            voteAvarege={vote_average}
          />
        ))}
    </section>
  )
}
