import { Header } from '@/components'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header option="projects" />
      {children}
    </>
  )
}
