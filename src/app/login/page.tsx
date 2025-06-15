'use client'

import Image from 'next/image'
import Link from 'next/link'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const loginSchema = z.object({
  email: z.string().nonempty('Informe o e-mail').email('E-mail inválido'),
  password: z.string().nonempty('Informe a senha')
})

type LoginSchema = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
  })

  function handleLogin({ email, password }: LoginSchema) {
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    }).then((response) => {
      if (response.status === 401) {
        toast.error('Email ou senha incorretos')
      }

      if (response.status === 500) {
        toast.error('Ocorreu um erro ao realizar o login.')
      }

      if (response.ok) {
        toast.success('Login realizado com sucesso!')
        router.push('/')
      }
    })
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <form
        method="POST"
        onSubmit={handleSubmit(handleLogin)}
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
          <div>
            <Input type="email" placeholder="Email" {...register('email')} />
            {errors.email && (
              <span className="text-xs text-red-500">{errors.email.message}</span>
            )}
          </div>
          <div>
            <Input type="password" placeholder="Senha" {...register('password')} />
            {errors.password && (
              <span className="text-xs text-red-500">{errors.password.message}</span>
            )}
          </div>
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
