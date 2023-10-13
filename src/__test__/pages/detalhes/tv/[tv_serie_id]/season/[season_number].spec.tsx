import { render, screen } from '@testing-library/react'

import SeasonDetails from '@app/(pages)/detalhes/tv/[tv_serie_id]/season/[season_number]/page'

describe('<SeasonDetails />', () => {
  it('', async () => {
    const params = {
      tv_serie_id: '12',
      season_number: '2',
    }

    render(await SeasonDetails({ params }))
  })
})
