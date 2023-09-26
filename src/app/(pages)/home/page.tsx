import { Metadata } from 'next'
import { Coursel } from '@app/components/carousel'
import { MoviesList } from '@app/components/moviesList'

export const metadata: Metadata = {
  title: '| Home',
}

export default async function HomePage() {
  return (
    <section className="right-0 w-[85%] bg-black">
      <Coursel />

      <MoviesList listTitle="Ação" genreId={28} />
      <MoviesList listTitle="Aventura" genreId={12} />
      <MoviesList listTitle="Animação" genreId={16} />
      <MoviesList listTitle="Comédia" genreId={35} />
      <MoviesList listTitle="Crime" genreId={80} />
      <MoviesList listTitle="Documentário" genreId={99} />
      <MoviesList listTitle="Drama" genreId={18} />
    </section>
  )
}
