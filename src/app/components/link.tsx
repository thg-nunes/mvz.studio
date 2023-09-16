'use client'
import Link from 'next/link'
import { ReactElement } from 'react'
import { usePathname } from 'next/navigation'

export type LinkProps = {
  linkIcon: ReactElement
  pathName: string
}

const linkStyle = {
  active: 'flex items-center gap-2 text-cyan-600 border-r border-cyan-600',
  default: 'flex items-center gap-2 text-white',
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
    </Link>
  )
}
