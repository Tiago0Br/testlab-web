import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: 'Testlab - Início',
  description: 'Gerencie seus casos de testes com facilidade e eficiência.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className="dark bg-background text-foreground antialiased">
        <Toaster position="top-center" richColors closeButton />
        {children}
      </body>
    </html>
  )
}
