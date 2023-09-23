import RootLayout from '@app/layout'
import { render, screen } from '@testing-library/react'

describe('<RootLayout />', () => {
  it('Ensures that the root layout render the correct elements', () => {
    render(
      <RootLayout>
        <p>empty</p>
      </RootLayout>
    )

    expect(screen.getByText('MVZ.studio')).toBeInTheDocument()
    expect(
      screen.getByText((content, element) => {
        return (
          element?.tagName.toLowerCase() === 'a' &&
          element.getAttribute('href') === '/home'
        )
      })
    ).toBeInTheDocument()
  })
})
