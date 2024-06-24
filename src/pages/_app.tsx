import { Toaster } from '@/components'
import { AuthProvider } from '@/context/AuthContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <Component {...pageProps} />
        <Toaster richColors closeButton position="top-center" />
      </AuthProvider>
    </>
  )
}
