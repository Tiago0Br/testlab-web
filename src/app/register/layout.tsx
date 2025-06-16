import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Testlab - Cadastro',
  description: 'Cadastre-se para começar a testar!!!'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
