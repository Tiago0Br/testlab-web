'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Image from 'next/image'
import Link from 'next/link'

import { Button, Input, Loading, ShowPasswordButton } from '@/components'
import { signIn, logout } from '@/services/auth-service'
import logo from '@/assets/logo.png'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email.trim() || !password.trim()) {
      toast.error('Preencha todos os campos')
      return
    }

    setIsLoading(true)
    signIn(email, password).then(({ error, data }) => {
      setIsLoading(false)
      if (data) {
        setIsLoading(false)
        router.push('/')
        return toast.success(`Seja bem-vindo ${data.user.name}!`)
      }

      toast.error(error!)
    })
  }

  useEffect(() => {
    logout()
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="bg-zinc-900 border rounded-xl flex flex-col items-center gap-10 py-20 px-10">
        <div className="flex flex-col items-center gap-3">
          <Image
            src={logo}
            alt="Logo Testlab"
            width={0}
            height={0}
            className="w-[70px] h-[70px]"
            draggable={false}
          />
          <h1 className="text-2xl">Bora testar!</h1>
        </div>
        <form className="flex flex-col items-center gap-3 w-72" onSubmit={handleLogin}>
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="w-full relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <ShowPasswordButton
              onClick={() => setShowPassword((state) => !state)}
              showPassword={showPassword}
            />
          </div>
          <Button className="w-full border border-primary text-primary bg-transparent uppercase font-bold hover:bg-primary hover:text-white">
            Login
          </Button>
        </form>
        <div>
          <span className="text-xs">
            Não possui conta?{' '}
            <Link href="/register" className="underline">
              Criar conta
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}
