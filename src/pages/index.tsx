import { verifyToken } from '@/utils/verifyToken'
import { GetServerSideProps } from 'next'
import {
  Header,
  Loading,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useApi } from '@/hooks/useApi'

type Project = {
  id: number
  name: string
  description: string
}

export default function Home({ token }: { token: string }) {
  const api = useApi()
  const [projects, setProjects] = useState<Project[]>([])
  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const onProjectChange = (projectId: string) => {
    setCurrentProject(
      projects.find((project) => project.id === Number(projectId)) ?? null
    )
  }

  useEffect(() => {
    setIsLoading(true)
    api.getUserProjects(token).then((response) => {
      setProjects(response.data)
      setIsLoading(false)
    })
  }, [])
  return (
    <>
      <Head>
        <title>Testlab - Início</title>
      </Head>
      <Loading isLoading={isLoading} />
      <div className="h-screen bg-gray-900">
        <Header />
        <div className="flex flex-col items-center">
          <h1 className="mt-20 font-semibold text-xl">
            {currentProject?.name ?? 'Nenhum projeto selecionado'}
          </h1>

          <Select onValueChange={onProjectChange}>
            <SelectTrigger className="mt-5 w-60 bg-gray-800">
              <SelectValue placeholder="Projeto" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800">
              {projects.map((project) => (
                <SelectItem
                  key={project.id}
                  value={`${project.id}`}
                  className="text-white"
                >
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) =>
  verifyToken(ctx)
