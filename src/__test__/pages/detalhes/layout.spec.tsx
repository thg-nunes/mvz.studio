import { render, screen } from '@testing-library/react'
import MovieDetailsLayout from '@app/(pages)/detalhes/layout'

describe('<MovieDetailsLayout />', () => {
  it('Ensures that in movie details page has a link to back to home page', () => {
    render(
      <MovieDetailsLayout>
        <p>empty</p>
      </MovieDetailsLayout>
    )

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
