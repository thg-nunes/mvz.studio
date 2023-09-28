import { MoviesList } from '@app/components/moviesList'
import { useFetchMoviesToDiscoverPage } from '@app/hooks/pages/descubra'

export default async function DiscoverPage() {
  const [popularMovies, popularTvShowsList, debutTvShowsList] =
    await useFetchMoviesToDiscoverPage()

  return (
    <div className="pageContainer">
      <h2 className="px-10 text-2xl font-bold text-white">Discover</h2>

      {popularMovies.results.length && (
        <MoviesList
          movies={popularMovies.results}
          listTitle="Filmes Populares"
          listType="movie"
        />
      )}
      {popularTvShowsList.results.length && (
        <MoviesList
          movies={popularTvShowsList.results}
          listTitle="Séries de Tv"
          listType="tv"
        />
      )}
      {debutTvShowsList.results.length && (
        <MoviesList
          movies={debutTvShowsList.results}
          listTitle="Estréia essa semana"
          listType="tv"
        />
      )}
    </div>
  )
}
