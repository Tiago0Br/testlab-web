import logo from '@/assets/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import { FormEvent, useState } from 'react'
import { CustomInput, Button } from '@/components'
import { useApi } from '@/hooks/useApi'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const api = useApi()
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
    api
      .register(name, email, password)
      .then(() => {
        toast.success('Cadastro realizado com sucesso!')
        clearFields()
        router.push('/login')
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Ocorreu um erro')
      })
  }

  return (
    <>
      <Head>
        <title>Testlab - Login</title>
      </Head>
      <div className="w-screen h-screen bg-gray-900 flex flex-col items-center justify-center">
        <div
          className="bg-gray-800 w-[390px] h-[512px] rounded-xl 
        flex flex-col gap-5 items-center py-5"
        >
          <div className="flex flex-col items-center gap-3">
            <Image
              src={logo}
              alt="Logo Testlab"
              width={0}
              height={0}
              className="w-[70px] h-[70px]"
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
            <CustomInput
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <CustomInput
              type="password"
              placeholder="Confirmar senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button className="bg-gradient-to-l from-[#21d4fd] to-[#b721ff] w-full uppercase">
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
