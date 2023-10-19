import { render, screen } from '@testing-library/react'

import { EpisodeDetails } from '@app/components/episode-details'

describe('<EpisodeDetails />', () => {
  it('ensures that the component render the correct infors of one serie episode if the props is provided correctly', () => {
    const air_date = '2015-08-15'
    const episode_number = 2
    const name = 'fake-episode'
    const poster_path = '/fake-poser-path'
    const overview = 'fake-overview'
    const runtime = 123
    const vote_average = 8.8

    render(
      <EpisodeDetails
        air_date={air_date}
        episode_number={episode_number}
        name={name}
        overview={overview}
        poster_path={poster_path}
        runtime={runtime}
        vote_average={vote_average}
      />
    )

    expect(
      screen.getByAltText(`imagem do episódio ${episode_number} da série ${name}`)
    ).toBeInTheDocument()
    expect(
      screen.getByText((content) => {
        return content.includes(`${episode_number} - ${name}`)
      })
    ).toBeInTheDocument()
    expect(
      screen.getByText((content) => {
        return content.includes(`${vote_average}`)
      })
    ).toBeInTheDocument()
    expect(
      screen.getByText((content) => {
        return content.includes(`${air_date} • ${runtime}m`)
      })
    ).toBeInTheDocument()
    expect(screen.getByText(overview)).toBeInTheDocument()
  })
})
