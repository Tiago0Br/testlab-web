import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Testlab - Cadastro',
  description: 'Cadastre para começar a criar seus testes!',
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
