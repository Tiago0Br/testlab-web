'use client'

import logo from '@/assets/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import { Button, CustomInput, Loading } from '@/components'
import { FormEvent, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { signIn, logout } from '@/services/auth-service'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
      if (data) {
        setIsLoading(false)
        router.push('/')
        return toast.success(`Seja bem-vindo ${data.user.name}!`)
      }

      toast.error(error!)
      setIsLoading(false)
    })
  }

  useEffect(() => {
    logout()
  }, [])

  return (
    <>
      <div className="w-screen min-h-screen flex flex-col items-center justify-center">
        <Loading isLoading={isLoading} />
        <div className="bg-foreground w-[390px] h-[512px] rounded-xl flex flex-col gap-10 items-center py-20">
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
          <form
            className="flex flex-col items-center gap-6 w-72"
            onSubmit={handleLogin}
          >
            <CustomInput
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <CustomInput
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              className="w-full border border-primary text-primary bg-transparent uppercase font-bold 
            hover:bg-primary hover:text-white"
            >
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
    </>
  )
}
