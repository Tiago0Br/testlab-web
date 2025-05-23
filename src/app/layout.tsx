import type { Metadata } from 'next'
import './globals.css'

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
      <body className="dark bg-background text-foreground antialiased">{children}</body>
    </html>
  )
}
