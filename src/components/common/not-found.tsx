import Image from 'next/image'
import Link from 'next/link'
import { Button } from '..'

export function NotFound() {
  return (
    <div className="w-full flex flex-col items-center">
      <Image
        src="/no-content.png"
        width={400}
        height={400}
        alt="Página não encontrada"
      />
      <h1 className="text-3xl font-bold">Página não encontrada D:</h1>
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
