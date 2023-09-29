import { render, screen } from '@testing-library/react'

import NotFoundMovie, { metadata } from '@app/(pages)/detalhes/movie/[movie_id]/not-found'

describe('<NotFoundMovie />', () => {
  it('Ensures that the not-found movie page render an link to back to home page and the correct title when is render', () => {
    const { title } = metadata
    render(<NotFoundMovie />)

    const linkGoHomePage = screen.getByText((content, element) => {
      return (
        element?.tagName.toLowerCase() === 'a' && element.getAttribute('href') === '/home'
      )
    })

    expect(linkGoHomePage).toBeInTheDocument()
    expect(title).toEqual('| Filme não encontrado')
  })
})
