import Image from "next/image";
import logo from "@/assets/logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Head from "next/head";
import { useContext, useState } from "react";
import { toast } from "sonner"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()
  const { signIn } = useContext(AuthContext)

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      toast.error('Preencha todos os campos')
      return;
    }

    signIn(email, password)
      .then(({ success, error, user }) => {
        if (success) {
          router.push('/')
          return toast.success(`Seja bem-vindo ${user?.name}!`)
        }

        toast.error(error)
      })
  }

  return (
    <>
    <Head>
      <title>Testlab - Login</title>
    </Head>
      <div className="w-screen h-screen bg-[#111111] flex flex-col items-center justify-center">
      <div 
        className="bg-[#333333] w-[390px] h-[512px] rounded-xl 
        flex flex-col gap-10 items-center py-20"
      >
        <div className="flex flex-col items-center gap-3">
          <Image src={logo} alt="Logo Testlab" width={0} height={0} className="w-[70px] h-[70px]" />
          <h1 className="text-2xl text-white">Bora testar!</h1>
        </div>
        <div className="flex flex-col items-center gap-6 w-72">
          <Input 
            type="email" 
            placeholder="E-mail" 
            className="bg-transparent text-white rounded-none border-0 border-b-2 placeholder:text-[#999]"
            value={email}
            onChange={e => setEmail(e.target.value)} 
          />
          <Input 
            type="password" 
            placeholder="Senha" 
            className="bg-transparent text-white rounded-none border-0 border-b-2 placeholder:text-[#999]"
            value={password}
            onChange={e => setPassword(e.target.value)} 
          />
          <Button 
            className="bg-gradient-to-l from-[#21d4fd] to-[#b721ff] w-full uppercase"
            onClick={handleLogin}  
          >
            Login
          </Button>
        </div>
        <div>
          <span className="text-white text-xs">
            Não possui conta? <Link href="/register" className="underline">Criar conta</Link>
          </span>
        </div>
      </div>
    </div>
    </>
  );
}
