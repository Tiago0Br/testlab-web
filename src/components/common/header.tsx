import logo from '@/assets/logo.png'
import Image from 'next/image'
import { MenuItem } from './menuItem'
import Link from 'next/link'

export function Header() {
  return (
    <header className="bg-foreground w-full h-24 flex justify-between items-center px-20">
      <Link href="/">
        <Image src={logo} alt="logo" width={60} height={60} />
      </Link>
      <nav className="flex justify-center items-center gap-8">
        <MenuItem title="Início" selected />
        <MenuItem title="Projetos" />
        <MenuItem title="Perfil" />
        <MenuItem title="Sair" redirect="/login" />
      </nav>
    </header>
  )
}
