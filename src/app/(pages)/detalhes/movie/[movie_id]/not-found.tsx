import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '| Filme não encontrado',
}

export default function NotFoundMovie() {
  return (
    <div className="mx-auto flex w-9/12 flex-col gap-3 py-10 text-center text-white">
      <h2 className="text-2xl font-semibold">
        Filme não encontrado. Tente novamente depois.
      </h2>
      <Link
        href="/home"
        className="group/link relative mx-auto w-max text-center hover:text-white/80"
      >
        voltar ao início
        <span className="absolute bottom-0 left-0 w-[10%] border duration-150 group-hover/link:w-full" />
      </Link>
    </div>
  )
}
