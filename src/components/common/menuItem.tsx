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
        selected && 'text-primary'
      } hover:text-primary`}
      href={redirect ? redirect : '#'}
    >
      {title}
    </Link>
  )
}
