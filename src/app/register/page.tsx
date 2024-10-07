'use client'

import logo from '@/assets/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { CustomInput, Button, Loading, ShowPasswordButton } from '@/components'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { register } from '@/api'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

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
    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      toast.error('Preencha todos os campos')
      return
    }
    if (password !== confirmPassword) {
      toast.error('Senhas não coincidem! Por favor, verifique.')
      return
    }

    setIsLoading(true)

    register({ name, email, password }).then(({ error }) => {
      setIsLoading(false)

      if (error) {
        toast.error(error)
        return
      }

      toast.success('Cadastro realizado com sucesso!')
      clearFields()
      router.push('/login')
    })
  }

  return (
    <>
      <Loading isLoading={isLoading} />
      <div className="w-screen min-h-screen flex flex-col items-center justify-center">
        <div
          className="bg-foreground w-[390px] h-[512px] rounded-xl 
        flex flex-col gap-5 items-center py-5"
        >
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
            onSubmit={handleRegister}
          >
            <CustomInput
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <CustomInput
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="w-full relative">
              <CustomInput
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
              <CustomInput
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
            <Button
              className="w-full border border-primary text-primary bg-transparent uppercase font-bold 
            hover:bg-primary hover:text-white"
            >
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
