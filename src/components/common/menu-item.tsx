import Link from 'next/link'

interface MenuItemProps {
  title: string
  redirect?: string
  selected?: boolean
}

export function MenuItem({ title, redirect, selected }: MenuItemProps) {
  return (
    <Link
      data-selected={selected}
      className="font-bold text-xl transition data-[selected=true]:text-primary hover:text-primary"
      href={redirect ?? '#'}
    >
      {title}
    </Link>
  )
}
