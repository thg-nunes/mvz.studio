import { Metadata } from 'next'

import { useFetchTVSeasonDetails } from '@app/hooks/pages/detalhes/tv/season-details'

export type SeasonDetailsPageParams = {
  params: {
    tv_serie_id: string
    season_number: string
  }
}

export const generateMetadata = async ({
  params,
}: SeasonDetailsPageParams): Promise<Metadata> => {
  const seasonDetails = await useFetchTVSeasonDetails({ params })

  return {
    title: ' - ' + seasonDetails.name,
  }
}

export default async function SeasonDetails({
  params,
}: SeasonDetailsPageParams): Promise<JSX.Element> {
  //www.themoviedb.org/tv/65930/season/3/episode/1?language=pt-BR

  const seasonDetails = await useFetchTVSeasonDetails({ params })

  return <div>a</div>
}
