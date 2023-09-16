'use client'
import Link from 'next/link'
import { ReactElement } from 'react'

export type LinkProps = {
  linkIcon: ReactElement
  pathName: string
}

export const LinkComponent = ({ linkIcon, pathName }: LinkProps): JSX.Element => {
  const pathNameToLoawerCase = pathName.toLowerCase()

  return (
    <section className="flex items-center gap-2 text-white">
      {linkIcon}
      <Link href={`/${pathNameToLoawerCase}`}>{pathName}</Link>
    </section>
  )
}
