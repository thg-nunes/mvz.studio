import { Metadata } from 'next'
import { Caroursel } from '@app/components/carousel'
import { MoviesList } from '@app/components/moviesList'

export const metadata: Metadata = {
  title: '| Home',
}

export default async function HomePage() {
  return (
    <section className="pageContainer">
      <Caroursel />

      <MoviesList listTitle="Ação" genreId={28} listType="movie" />
      <MoviesList listTitle="Aventura" genreId={12} listType="movie" />
      <MoviesList listTitle="Animação" genreId={16} listType="movie" />
      <MoviesList listTitle="Comédia" genreId={35} listType="movie" />
      <MoviesList listTitle="Crime" genreId={80} listType="movie" />
      <MoviesList listTitle="Documentário" genreId={99} listType="movie" />
      <MoviesList listTitle="Drama" genreId={18} listType="movie" />
    </section>
  )
}
