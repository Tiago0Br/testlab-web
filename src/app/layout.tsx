import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import { ReactQueryProvider } from '@/providers/query-client-provider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Testlab - Início',
  description: 'Um gerenciador de casos de testes moderno'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className={`${inter.className} dark antialiased`}>
        <Toaster richColors closeButton position="top-center" />
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  )
}
