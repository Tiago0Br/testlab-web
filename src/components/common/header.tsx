import logo from '@/assets/logo.png'
import Image from 'next/image'
import { MenuItem } from './menuItem'

export function Header() {
  return (
    <header className="bg-gray-800 w-full h-24 flex justify-between items-center px-20">
      <Image src={logo} alt="logo" width={60} height={60} />
      <nav className="flex justify-center items-center gap-8">
        <MenuItem title="Início" selected />
        <MenuItem title="Projetos" />
        <MenuItem title="Perfil" />
        <MenuItem title="Sair" redirect="/login" />
      </nav>
    </header>
  )
}
