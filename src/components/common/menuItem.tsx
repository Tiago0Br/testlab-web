import Link from 'next/link'

interface MenuItemProps {
  title: string
  redirect?: string
  selected?: boolean
}

export function MenuItem({ title, redirect, selected }: MenuItemProps) {
  return (
    <Link
      className={`font-bold text-xl transition ${
        selected && 'text-green-500'
      } hover:text-green-500`}
      href={redirect ? redirect : '#'}
    >
      {title}
    </Link>
  )
}
