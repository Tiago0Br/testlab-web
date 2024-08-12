'use client'

import { Loading } from '@/components'
import { useState } from 'react'
interface FoldersPageProps {
  params: {
    id: string
  }
}

export default function Folders({ params: { id } }: FoldersPageProps) {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
      <Loading isLoading={isLoading} />
      {!isLoading && <h1>Pasta de ID {id}</h1>}
    </>
  )
}
