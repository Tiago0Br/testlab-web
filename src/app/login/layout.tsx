import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Testlab - Login',
  description: 'Faça seu login para começar a testar!!!'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
