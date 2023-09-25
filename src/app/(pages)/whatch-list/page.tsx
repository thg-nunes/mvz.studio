import { AiFillHeart } from 'react-icons/ai'

import { MoviesSection } from './moviesSection'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lista de favoritos',
}

export default function WhatchListPage() {
  return (
    <section className="right-0 w-[85%] bg-black">
      <h2 className="flex items-center gap-3 px-10 text-2xl font-bold text-white">
        Lista de interesse <AiFillHeart />
      </h2>
      <MoviesSection />
    </section>
  )
}
