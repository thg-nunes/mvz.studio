'use client'

import { Metadata } from 'next'
import { useRouter } from 'next/navigation'

export const metadata: Metadata = {
  title: ' - Não Encontrado',
}

export default function EpisodeNotFoundPage() {
  const { back } = useRouter()

  return (
    <div className="mx-auto max-w-[85%] text-white">
      <h2 className="text-center text-2xl font-bold">Não Encontrado</h2>
      <p className="my-3 text-center">
        Não foram encontradas informações sobre esse episódio.
      </p>
      <button
        type="button"
        className="blueButton ml-[50%] translate-x-[-50%] p-1 px-4 text-white"
        onClick={back}
      >
        voltar
      </button>
    </div>
  )
}
