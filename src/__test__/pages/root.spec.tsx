import { redirect } from 'next/navigation'
import { render } from '@testing-library/react'

import IndexPage from '@app/page'

jest.mock('next/navigation', () => {
  return {
    redirect: jest.fn(),
  }
})

describe('<IndexPage />', () => {
  it('Should redirect to home page', () => {
    render(<IndexPage />)

    expect(redirect).toHaveBeenNthCalledWith(1, '/home')
  })
})
