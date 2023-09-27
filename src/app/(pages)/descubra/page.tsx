import { MoviesList } from '@app/components/moviesList'
import { useFetchMoviesToDiscoverPage } from '@app/hooks/pages/descubra'

export default async function DiscoverPage() {
  const [popularMovies, popularTvShowsList, debutTvShowsList] =
    await useFetchMoviesToDiscoverPage()

  return (
    <div>
      <h2>Discover</h2>

      {popularMovies.results.length && (
        <MoviesList movies={popularMovies.results} listTitle="Filmes Populares" />
      )}
      {popularMovies.results.length && (
        <MoviesList movies={popularTvShowsList.results} listTitle="Séries de Tv" />
      )}
      {popularMovies.results.length && (
        <MoviesList movies={debutTvShowsList.results} listTitle="Estréia essa semana" />
      )}
    </div>
  )
}
