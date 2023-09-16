import { render, screen } from '@testing-library/react'

import { MovieCard } from '@app/components/movieCard'

describe('<MovieCard />', () => {
  it('Should render the movie card with image, vote, title and description', () => {
    const movieTitle = 'any movie title'
    const voteAvarege = 7.5
    const moviePathImage = '/any-moviePathImage'
    const movieDescription = 'any movie movieDescription'
    render(
      <MovieCard
        movieTitle={movieTitle}
        voteAvarege={voteAvarege}
        moviePathImage={moviePathImage}
        movieDescription={movieDescription}
      />
    )
    const movieImage = screen.getByAltText(`imagem de capa do filme ${movieTitle}`)

    expect(movieImage.tagName).toBe('IMG')
    expect(movieImage).toHaveProperty('alt', `imagem de capa do filme ${movieTitle}`)

    expect(screen.getByText(movieTitle)).toBeInTheDocument()
    expect(screen.getByText(voteAvarege)).toBeInTheDocument()
    expect(screen.getByText(movieDescription)).toBeInTheDocument()
  })
})
