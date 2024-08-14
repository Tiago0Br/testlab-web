import logo from '@/assets/logo.png'
import Image from 'next/image'
import { MenuItem } from './MenuItem'
import Link from 'next/link'

type MenuOptions = 'inicio' | 'projetos' | 'perfil'

interface MenuProps {
  option?: MenuOptions
}

export function Header({ option = 'inicio' }: MenuProps) {
  return (
    <div className="bg-foreground w-full h-24 flex justify-between items-center px-20">
      <Link href="/">
        <Image src={logo} alt="logo" width={60} height={60} />
      </Link>
      <nav className="flex justify-center items-center gap-8">
        <MenuItem title="Início" selected={option === 'inicio'} redirect="/" />
        <MenuItem
          title="Projetos"
          selected={option === 'projetos'}
          redirect="/projects"
        />
        <MenuItem
          title="Perfil"
          selected={option === 'perfil'}
          redirect="/profile"
        />
        <MenuItem title="Sair" redirect="/login" />
      </nav>
    </div>
  )
}
