import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Testlab - Caso de testes',
  description: 'Gerencie casos de testes',
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
