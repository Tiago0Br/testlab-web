'use client'

import { FormEvent, useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import { Button, Loading, ShowPasswordButton, Input } from '@/components'
import logo from '@/assets/logo.png'
import { register } from '@/actions/register'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const clearFields = () => {
    setName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  const handleRegister = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      toast.error('Preencha todos os campos')
      return
    }
    if (password !== confirmPassword) {
      toast.error('Senhas não coincidem! Por favor, verifique.')
      return
    }

    setIsLoading(true)

    register({ name, email, password })
      .then(() => {
        toast.success('Cadastro realizado com sucesso!')
        clearFields()
        router.push('/login')
      })
      .catch((error) => {
        toast.error(error?.message ?? 'Erro ao realizar o cadastro.')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <>
      <Loading isLoading={isLoading} />
      <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-background">
        <div className="bg-zinc-900 border w-[390px] h-[512px] rounded-xl flex flex-col gap-5 items-center py-5">
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
          <form className="flex flex-col items-center gap-3 w-72" onSubmit={handleRegister}>
            <Input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
            <div className="w-full relative">
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirmar senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <ShowPasswordButton
                onClick={() => setShowConfirmPassword((state) => !state)}
                showPassword={showConfirmPassword}
              />
            </div>
            <Button className="w-full border border-primary text-primary bg-transparent uppercase font-bold hover:bg-primary hover:text-white">
              Cadastrar
            </Button>
          </form>
          <div>
            <span className="text-white text-xs">
              Já possui conta?{' '}
              <Link href="/login" className="underline">
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
