import { verifyToken } from "@/utils/verifyToken"
import { GetServerSideProps } from "next"
import Image from "next/image"
import logo from "@/assets/logo.png"
import noContentImg from "@/assets/no-content.jpg"
import Link from "next/link"

export default function Home() {
  return (
    <div className="h-screen">
      <header className="bg-[#111111] w-full h-24 flex justify-between items-center px-20">
        <Image src={logo} alt="logo" width={60} height={60} />
        <nav className="flex justify-center items-center gap-8">
          <Link className="text-white font-bold text-xl" href="#">Início</Link>
          <Link className="text-white font-bold text-xl" href="#">Projetos</Link>
          <Link className="text-white font-bold text-xl" href="#">Perfil</Link>
          <Link className="text-white font-bold text-xl" href="/login">Sair</Link>
        </nav>
      </header>
      <div className="h-full flex flex-col items-center">
        <h1 className="mt-20 font-semibold text-xl text-[#111111]">Em progresso...</h1>
        <Image src={noContentImg} alt="no content" width={350} height={350} unoptimized />
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => verifyToken(ctx)
