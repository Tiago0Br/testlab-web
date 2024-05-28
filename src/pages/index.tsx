import Image from "next/image";
import logo from "@/assets/logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Head from "next/head";

export default function Home() {
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
          />
          <Input 
            type="password" 
            placeholder="Senha" 
            className="bg-transparent text-white rounded-none border-0 border-b-2 placeholder:text-[#999]" 
          />
          <Button className="bg-gradient-to-l from-[#21d4fd] to-[#b721ff] w-full uppercase">
            Login
          </Button>
        </div>
        <div>
          <span className="text-white text-xs">
            Não possui conta? <a href="#" className="underline">Criar conta</a>
          </span>
        </div>
      </div>
    </div>
    </>
  );
}
