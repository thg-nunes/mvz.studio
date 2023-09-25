import { usePathname } from 'next/navigation'
import { render, screen } from '@testing-library/react'

import { LinkComponent } from '@app/components/link'

jest.mock('next/navigation', () => {
  return {
    usePathname: jest.fn(),
  }
})

const usePathnameMock = usePathname as jest.Mock

describe('<Link />', () => {
  const pathName = 'Home'

  it('Should render icon and link pathname', () => {
    render(
      <LinkComponent
        linkIcon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            data-testid="home-icon"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
            />
            <path
              fillRule="evenodd"
              d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
            />
          </svg>
        }
        pathName={pathName}
      />
    )

    expect(screen.getByTestId('home-icon')).toBeInTheDocument()
    expect(screen.getByText(pathName)).toBeInTheDocument()
  })

  it('Should render icon and link with different colors when the actual pathname is equal to the property pathName received', () => {
    usePathnameMock.mockReturnValueOnce('/home')

    render(
      <>
        <LinkComponent linkIcon={<p />} pathName={pathName} />
        <LinkComponent linkIcon={<p />} pathName={'Settings'} />
      </>
    )
    const linksOnScreen = screen.getAllByText((content, element) => {
      return element?.hasAttribute('href')
    })

    expect(linksOnScreen.length).toEqual(2)

    expect(linksOnScreen[0].className).toEqual(
      'flex items-center gap-2 py-2 group/link relative text-cyan-600 border-r border-cyan-600'
    )
  })
})
