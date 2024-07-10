import logo from '@/assets/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import { Button, CustomInput, Loading } from '@/components'
import { FormEvent, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { AuthContext } from '@/context/AuthContext'
import { destroyCookie } from 'nookies'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { signIn } = useContext(AuthContext)

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email.trim() || !password.trim()) {
      toast.error('Preencha todos os campos')
      return
    }

    setIsLoading(true)
    signIn(email, password).then(({ success, error, user }) => {
      if (success) {
        setIsLoading(false)
        router.push('/')
        return toast.success(`Seja bem-vindo ${user?.name}!`)
      }

      const defaultErrorMessage =
        'Erro de conexão com o servidor. Por favor, tente novamente mais tarde.'

      toast.error(error ?? defaultErrorMessage)
      setIsLoading(false)
    })
  }

  useEffect(() => {
    destroyCookie(null, 'testlab.token')
  }, [])

  return (
    <>
      <Head>
        <title>Testlab - Login</title>
      </Head>
      <Loading isLoading={isLoading} />
      <div className="w-screen h-screen bg-background flex flex-col items-center justify-center">
        <div className="bg-foreground w-[390px] h-[512px] rounded-xl flex flex-col gap-10 items-center py-20">
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
