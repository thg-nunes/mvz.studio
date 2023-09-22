import { render, screen } from '@testing-library/react'

import { MovieCard } from '@app/components/movieCard'

describe('<MovieCard />', () => {
  it('Should render the movie card with image, vote, title and description', () => {
    const any_movie_id = 112
    const movieTitle = 'any movie title'
    const voteAvarege = 7.5
    const moviePathImage = '/any-moviePathImage'
    const movieDescription = 'any movie movieDescription'

    render(
      <MovieCard
        movie_id={any_movie_id}
        movieTitle={movieTitle}
        voteAvarege={voteAvarege}
        moviePathImage={moviePathImage}
        movieDescription={movieDescription}
      />
    )
    const movieImage = screen.getByAltText(`imagem de capa do filme ${movieTitle}`)

    expect(movieImage.tagName).toBe('IMG')
    expect(movieImage).toHaveProperty('alt', `imagem de capa do filme ${movieTitle}`)

    expect(screen.getByText(movieTitle.slice(0, 14) + '...')).toBeInTheDocument()
    expect(screen.getByText(voteAvarege)).toBeInTheDocument()
    expect(screen.getByText(movieDescription.slice(0, 36) + '...')).toBeInTheDocument()
  })

  it('Ensures that the card render an alternative text if the movie does not have a text description', () => {
    const any_movie_id = 112
    const movieTitle = 'any movie title'
    const voteAvarege = 7.5
    const moviePathImage = '/any-moviePathImage'
    const movieDescription = ''

    render(
      <MovieCard
        movie_id={any_movie_id}
        movieTitle={movieTitle}
        voteAvarege={voteAvarege}
        moviePathImage={moviePathImage}
        movieDescription={movieDescription}
      />
    )
    const movieImage = screen.getByAltText(`imagem de capa do filme ${movieTitle}`)

    expect(movieImage.tagName).toBe('IMG')
    expect(movieImage).toHaveProperty('alt', `imagem de capa do filme ${movieTitle}`)

    expect(screen.getByText(movieTitle.slice(0, 14) + '...')).toBeInTheDocument()
    expect(screen.getByText(voteAvarege)).toBeInTheDocument()
    expect(screen.getByText('este filme não tem descrição')).toBeInTheDocument()
  })
})
