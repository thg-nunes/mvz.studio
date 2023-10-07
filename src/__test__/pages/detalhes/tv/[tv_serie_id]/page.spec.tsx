import { render, screen, waitFor } from '@testing-library/react'

import { useFetchTVSerieDetails } from '@app/hooks/pages/detalhes/tv/serie_id'
import TvSerieDetailsById, {
  generateMetadata,
} from '@app/(pages)/detalhes/tv/[tv_serie_id]/page'

jest.mock('@app/hooks/pages/detalhes/tv/serie_id')
const useFetchTVSerieDetailsMock = useFetchTVSerieDetails as jest.Mock

describe('<TvSerieDetailsById />', () => {
  it('ensures that the metadata function fetch the serieDetails and return the title of page with the serie name', async () => {
    const fake_serie_id = {
      tv_serie_id: '123',
    }

    useFetchTVSerieDetailsMock.mockResolvedValue({
      serieDetails: {
        name: 'any_name',
      },
    })

    const metadata = await generateMetadata({
      params: fake_serie_id,
    })

    await waitFor(() => expect(metadata).toEqual({ title: ' - any_name' }))
  })
})
