import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <form
        method="POST"
        className="w-[390px] flex flex-col items-center bg-zinc-900 rounded-lg border py-8 px-12 gap-6"
      >
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/testlab-logo.png"
            width={80}
            height={80}
            alt="Logo do projeto Testlab"
            draggable={false}
          />
          <h1 className="text-2xl">Cadastre-se</h1>
        </div>
        <div className="w-full flex flex-col gap-3">
          <Input placeholder="Nome" />
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Senha" />
          <Input type="password" placeholder="Confirmar senha" />
        </div>

        <Button type="submit" className="w-full uppercase">
          Cadastrar
        </Button>

        <span className="text-sm">
          Já possui conta?{' '}
          <Link className="underline" href="/login">
            Login
          </Link>
        </span>
      </form>
    </div>
  )
}
