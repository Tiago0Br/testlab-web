import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function LoginPage() {
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
          <h1 className="text-2xl">Login</h1>
        </div>
        <div className="w-full flex flex-col gap-3">
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Senha" />
        </div>

        <Button type="submit" className="w-full uppercase">
          Entrar
        </Button>

        <span className="text-sm">
          Não possui conta?{' '}
          <Link className="underline" href="/register">
            Cadastre-se
          </Link>
        </span>
      </form>
    </div>
  )
}
