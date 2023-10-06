import { TVSerieRecomendation } from '@app/components/tvSerieRecomendation'
import { render, screen } from '@testing-library/react'

describe('<TVSerieRecomendation />', () => {
  it('ensures that the TVSerieRecomendation component render recomendation serie info', () => {
    const fake_similar_tv_show_data = {
      backdrop_path: 'fake_backdrop_path',
      id: 1,
      first_air_date: '2020-08-22',
      vote_average: 8.8,
      name: 'fake_name',
    }

    render(<TVSerieRecomendation similarTvShowCard={fake_similar_tv_show_data} />)

    expect(screen.getByText('fake_name')).toBeInTheDocument()
    expect(screen.getByText('2020-08-22')).toBeInTheDocument()
    expect(screen.getByText('8.8%')).toBeInTheDocument()
  })
})
