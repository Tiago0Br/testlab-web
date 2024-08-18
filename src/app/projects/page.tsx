import { Button } from '@/components'
import { MonitorCog } from 'lucide-react'
import Link from 'next/link'

export default function Projects() {
  return (
    <div className="w-full flex flex-col items-center">
      <MonitorCog className="mt-12 size-[200px]" />
      <h1 className="mt-6 text-3xl font-bold">Página em desenvolvimento...</h1>
      <Link href="/" className="mt-4">
        <Button
          className="border border-primary text-primary bg-transparent uppercase font-bold 
            hover:bg-primary hover:text-white"
        >
          Voltar ao início
        </Button>
      </Link>
    </div>
  )
}
