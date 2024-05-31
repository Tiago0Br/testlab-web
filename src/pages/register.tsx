import Image from "next/image";
import logo from "@/assets/logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Head from "next/head";
import { useState } from "react";
import { useApi } from "@/hooks/useApi";
import { toast } from "sonner"
import Link from "next/link";

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const api = useApi();

  const clearFields = () => {
    setName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  const handleRegister = () => {
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      toast.error('Preencha todos os campos')
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Senhas não coincidem! Por favor, verifique.')
      return;
    }
    api.register(name, email, password)
      .then(() => {
        toast.success('Cadastro realizado com sucesso!')
        clearFields()
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
      <div className="w-screen h-screen bg-[#111111] flex flex-col items-center justify-center">
      <div 
        className="bg-[#333333] w-[390px] h-[512px] rounded-xl 
        flex flex-col gap-5 items-center py-5"
      >
        <div className="flex flex-col items-center gap-3">
          <Image src={logo} alt="Logo Testlab" width={0} height={0} className="w-[70px] h-[70px]" />
          <h1 className="text-2xl text-white">Bora testar!</h1>
        </div>
        <div className="flex flex-col items-center gap-6 w-72">
          <Input 
            type="text" 
            placeholder="Nome" 
            className="bg-transparent text-white rounded-none border-0 border-b-2 placeholder:text-[#999]"
            value={name}
            onChange={e => setName(e.target.value)} 
          />
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
          <Input 
            type="password" 
            placeholder="Confirmar senha" 
            className="bg-transparent text-white rounded-none border-0 border-b-2 placeholder:text-[#999]"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)} 
          />
          <Button 
            className="bg-gradient-to-l from-[#21d4fd] to-[#b721ff] w-full uppercase"
            onClick={handleRegister}  
          >
            Cadastrar
          </Button>
        </div>
        <div>
          <span className="text-white text-xs">
            Já possui conta? <Link href="/" className="underline">Login</Link>
          </span>
        </div>
      </div>
    </div>
    </>
  );
}
