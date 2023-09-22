import { render, screen } from '@testing-library/react'

import { useFetchCarouselMoviesList } from '@app/hooks/components/carousel'
import { Coursel } from '@app/components/carousel'

jest.mock('@app/hooks/components/carousel', () => {
  return {
    useFetchCarouselMoviesList: jest.fn(),
  }
})
const useFetchCarouselMoviesListMock = useFetchCarouselMoviesList as jest.Mock

const carouselMoviesList = [
  {
    id: 1008042,
    overview:
      'When a group of friends discover how to conjure spirits using an embalmed hand, they become hooked on the new thrill, until one of them goes too far and unleashes terrifying supernatural forces.',
    poster_path: '/kdPMUMJzyYAc4roD52qavX0nLIC.jpg',
    title: 'Talk to Me',
  },
  {
    id: 346698,
    overview:
      'Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.',
    title: 'Barbie',
  },
  {
    id: 385687,
    overview:
      "Over many missions and against impossible odds, Dom Toretto and his family have outsmarted, out-nerved and outdriven every foe in their path. Now, they confront the most lethal opponent they've ever faced: A terrifying threat emerging from the shadows of the past who's fueled by blood revenge, and who is determined to shatter this family and destroy everything—and everyone—that Dom loves, forever.",
    title: 'Fast X',
  },
  {
    id: 615656,
    overview:
      'An exploratory dive into the deepest depths of the ocean of a daring research team spirals into chaos when a malevolent mining operation threatens their mission and forces them into a high-stakes battle for survival.',
    title: 'Meg 2: The Trench',
  },
  {
    id: 968051,
    overview:
      'In 1956 France, a priest is violently murdered, and Sister Irene begins to investigate. She once again comes face-to-face with a powerful evil.',
    title: 'The Nun II',
  },
  {
    id: 717930,
    overview:
      'After his mission is exposed, an undercover CIA operative stuck deep in hostile territory in Afghanistan must fight his way out, alongside his Afghan translator, to an extraction point in Kandahar, all whilst avoiding elite enemy forces and foreign spies tasked with hunting them down.',
    title: 'Kandahar',
  },
]

describe('<Coursel />', () => {
  beforeEach(() => {
    useFetchCarouselMoviesListMock.mockReturnValue({
      movies: carouselMoviesList,
    })
  })

  it('Ensures that the all five movies is render on carousel', () => {
    render(<Coursel />)

    expect(screen.getByText('Talk to Me')).toBeInTheDocument()
    expect(screen.getByText('Barbie')).toBeInTheDocument()
    expect(screen.getByText('Fast X')).toBeInTheDocument()
    expect(screen.getByText('Meg 2: The Trench')).toBeInTheDocument()
    expect(screen.getByText('The Nun II')).toBeInTheDocument()
    expect(screen.getByText('Kandahar')).toBeInTheDocument()
  })
})
