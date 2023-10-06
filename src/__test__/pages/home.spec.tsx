import { render } from '@testing-library/react'

import HomePage, { metadata } from '@app/(pages)/home/page'

describe('<HomePage />', () => {
  it('enrures thte the home page render correctly', () => {
    render(<HomePage />)
  })

  it('ensures that the metadata return the correct title', () => {
    expect(metadata).toHaveProperty('title', '| Home')
  })
})
