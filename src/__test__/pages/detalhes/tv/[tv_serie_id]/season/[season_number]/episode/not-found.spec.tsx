import { useRouter } from 'next/navigation'
import { fireEvent, render, screen } from '@testing-library/react'

import EpisodeNotFoundPage, {
  metadata,
} from '@app/(pages)/detalhes/tv/[tv_serie_id]/season/[season_number]/episode/[episode_number]/not-found'

jest.mock('next/navigation')

describe('<EpisodeNotFoundPage/>', () => {
  it('ensures that metadata returns one default title when an episode data is not found', () => {
    expect(metadata).toHaveProperty('title', ' - Não Encontrado')
  })

  it('ensures that has one button to back to last page when one episode details is not found', () => {
    const backMock = jest.fn()

    render(<EpisodeNotFoundPage />)

    jest.mocked(useRouter).mockReturnValue({
      back: backMock,
    } as any)

    expect(useRouter).toHaveBeenCalled()
    expect(screen.getByText('voltar')).toBeInTheDocument()

    fireEvent.click(screen.getByText('voltar'))

    expect(backMock).toHaveBeenCalled()
  })
})
