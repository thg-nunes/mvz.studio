'use client'
import Link from 'next/link'
import { ReactElement } from 'react'
import { usePathname } from 'next/navigation'

export type LinkProps = {
  linkIcon: ReactElement
  pathName: string
}

const linkStyle = {
  active:
    'flex items-center gap-2 py-2 group/link relative text-cyan-600 border-r border-cyan-600',
  default: 'flex items-center gap-2 py-2 group/link relative text-white',
}

export const LinkComponent = ({ linkIcon, pathName }: LinkProps): JSX.Element => {
  const pathNameToLoawerCase = pathName.toLowerCase()
  const activePathName = usePathname()
  const style =
    activePathName === `/${pathNameToLoawerCase}` ? linkStyle.active : linkStyle.default

  return (
    <Link href={`/${pathNameToLoawerCase}`} className={style}>
      {linkIcon}
      {pathName}
      <span className="absolute left-0 top-0 z-[-1] h-full w-0 bg-cyan-600/40 duration-200 group-hover/link:w-full" />
    </Link>
  )
}
