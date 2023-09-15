import { render, screen } from '@testing-library/react'

import Home from '@app/page'

describe('<Home />', () => {
  it('', () => {
    render(<Home />)
    const title = screen.getByText('MVZ')

    expect(title).toBeInTheDocument()
  })
})
