import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Testlab - Login',
  description: 'Faça login para começar seus testes!',
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
