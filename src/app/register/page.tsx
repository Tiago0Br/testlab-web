'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const registerSchema = z.object({
  name: z.string().nonempty('O nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  password: z
    .string()
    .nonempty('A senha é obrigatória')
    .min(6, 'A senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z
    .string()
    .nonempty('A confirmação da senha é obrigatória')
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
})

type RegisterFormSchema = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerSchema)
  })

  function handleRegister({ name, email, password, confirmPassword }: RegisterFormSchema) {
    if (password !== confirmPassword) {
      toast.error('Senhas divergentes. Por favor, verifique.')
      return
    }

    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    }).then((response) => {
      if (response.ok) {
        toast.success('Cadastro realizado com sucesso!')
        router.push('/login')
      } else {
        toast.error('Ocorreu um erro ao realizar o cadastro.')
      }
    })
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <form
        method="POST"
        onSubmit={handleSubmit(handleRegister)}
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
          <div className="space-y-0">
            <Input placeholder="Nome" {...register('name')} />
            {errors.name && (
              <span className="text-xs text-red-500">{errors.name.message}</span>
            )}
          </div>
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
          <div>
            <Input
              type="password"
              placeholder="Confirmar senha"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <span className="text-xs text-red-500">{errors.confirmPassword.message}</span>
            )}
          </div>
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
