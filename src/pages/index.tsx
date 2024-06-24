import { verifyToken } from '@/utils/verifyToken'
import { GetServerSideProps } from 'next'
import { Header } from '@/components'

export default function Home() {
  return (
    <div className="h-screen bg-gray-900">
      <Header />
      <div className="flex flex-col items-center">
        <h1 className="mt-20 font-semibold text-xl">Projeto de testes</h1>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) =>
  verifyToken(ctx)
