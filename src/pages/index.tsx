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
import { toast } from 'sonner'
import { PlusCircle } from '@phosphor-icons/react'

type Project = {
  id: number
  name: string
  description: string
}

type Folder = {
  id: number
  title: string
}

export default function Home({ token }: { token: string }) {
  const api = useApi()
  const [projects, setProjects] = useState<Project[]>([])
  const [folders, setFolders] = useState<Folder[]>([])
  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const onProjectChange = (projectId: string) => {
    const project =
      projects.find((project) => project.id === Number(projectId)) ?? null

    setCurrentProject(project)

    if (!project) {
      setFolders([])
      return
    }

    setIsLoading(true)

    api
      .getProjectFolders(token, project.id)
      .then((response) => {
        setFolders(response.data)
      })
      .catch((err) => {
        toast.error('Ocorreu um erro ao buscar as pastas')
        console.log(err)
      })
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    setIsLoading(true)
    api
      .getUserProjects(token)
      .then((response) => {
        const projectsResponse = response.data as Project[]

        setProjects(projectsResponse)
        setCurrentProject(projectsResponse[0] ?? null)

        if (projectsResponse[0]) {
          api
            .getProjectFolders(token, projectsResponse[0].id)
            .then((response) => {
              setFolders(response.data)
            })
        }

        setIsLoading(false)
      })
      .catch((err) => {
        toast.error('Ocorreu um erro ao buscar os projetos')
        console.log(err)
      })
      .finally(() => setIsLoading(false))
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
          <div className="flex justify-center items-center mt-6 gap-6">
            <h1 className="font-semibold text-xl">Selecione o projeto:</h1>
            <Select
              onValueChange={onProjectChange}
              value={currentProject ? `${currentProject.id}` : undefined}
            >
              <SelectTrigger className="w-60 bg-gray-800">
                <SelectValue placeholder="Selecione um projeto" />
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
            <button>
              <PlusCircle size={45} className="fill-green-500" />
            </button>
          </div>
          <div className="mt-6">
            {folders.map((folder) => (
              <p key={folder.id}>{folder.title}</p>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) =>
  verifyToken(ctx)
