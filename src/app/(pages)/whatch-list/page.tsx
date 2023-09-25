import { AiFillHeart } from 'react-icons/ai'

import { MoviesSection } from './moviesSection'

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
