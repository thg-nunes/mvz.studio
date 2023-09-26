import './globals.css'
import 'react-toastify/dist/ReactToastify.css'

import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { AiFillHome } from 'react-icons/ai'
import { LuListPlus } from 'react-icons/lu'
import { ToastContainer } from 'react-toastify'

import { LinkComponent } from '@components/link'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] })

export const metadata: Metadata = {
  title: {
    template: 'MVZ.studio %s',
    default: 'MVZ.studio',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={poppins.className}>
        <main className="flex">
          <section className="sticky top-0 h-screen w-[15%] border border-gray-100/10 bg-gray-900 py-4 pl-5">
            <p className="mb-7 text-center font-bold text-white">MVZ.studio</p>
            <div>
              <p className="font-semibold text-white">Menu</p>
              <LinkComponent pathName="Home" linkIcon={<AiFillHome />} />
              <LinkComponent pathName="Whatch-List" linkIcon={<LuListPlus />} />
            </div>
          </section>
          <ToastContainer />
          {children}
        </main>
      </body>
    </html>
  )
}
