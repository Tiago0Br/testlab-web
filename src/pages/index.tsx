import { verifyToken } from '@/utils/verifyToken'
import { GetServerSideProps } from 'next'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Folder as FolderComponent,
  Header,
  Loading,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Testcases,
} from '@/components'
import Head from 'next/head'
import { MouseEvent, useEffect, useState } from 'react'
import { useApi } from '@/hooks/useApi'
import { toast } from 'sonner'
import { CirclePlus } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Folder, Project, ProjectContent } from '@/types'

export default function Home({ token }: { token: string }) {
  const api = useApi()
  const searchParams = useSearchParams()

  const [projects, setProjects] = useState<Project[]>([])
  const [content, setContent] = useState<ProjectContent | null>(null)
  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const [folderId, setFolderId] = useState(() => {
    return searchParams.get('folder_id') ?? ''
  })
  const [currentFolder, setCurrentFolder] = useState<Folder | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const onProjectChange = (projectId: string) => {
    const project =
      projects.find((project) => project.id === Number(projectId)) ?? null

    setCurrentProject(project)

    if (!project) {
      setContent(null)
      return
    }

    setIsLoading(true)

    api
      .getProjectContent(token, project.id)
      .then((response) => {
        setContent({
          folders: response.data.folders,
          testCases: response.data.test_cases,
        })
      })
      .catch((err) => {
        toast.error('Ocorreu um erro ao buscar o conteúdo do projeto')
        console.log(err)
      })
      .finally(() => setIsLoading(false))
  }

  const onFolderSelect = (event: MouseEvent<HTMLDivElement>) => {
    const id = event.currentTarget.id
    const [NewFolderId] = id.split('-')
    setFolderId(NewFolderId)
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
            .getProjectContent(token, projectsResponse[0].id)
            .then((response) => {
              setContent({
                folders: response.data.folders,
                testCases: response.data.test_cases,
              })
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

  useEffect(() => {
    if (currentProject) {
      setIsLoading(true)

      api
        .getProjectContent(token, currentProject.id, currentFolder?.id)
        .then((response) => {
          setContent({
            folders: response.data.folders,
            testCases: response.data.test_cases,
          })
        })
        .catch(() => {
          toast.error('Ocorreu um erro ao buscar o conteúdo')
        })
        .finally(() => setIsLoading(false))
    }
  }, [currentProject, currentFolder])

  useEffect(() => {
    if (folderId) {
      const params = new URLSearchParams(searchParams.toString())
      params.set('folder_id', folderId)

      setCurrentFolder(
        content?.folders.find((folder) => folder.id === Number(folderId)) ??
          null
      )
    }
  }, [folderId])

  return (
    <>
      <Head>
        <title>Testlab - Início</title>
      </Head>
      <Loading isLoading={isLoading} />
      <div className="h-screen bg-background">
        <Header />
        <div className="flex flex-col items-center">
          {!currentFolder && (
            <div className="flex justify-center items-center mt-6 gap-6">
              <h1 className="font-semibold text-xl">Selecione o projeto:</h1>
              <Select
                onValueChange={onProjectChange}
                value={currentProject ? `${currentProject.id}` : undefined}
              >
                <SelectTrigger className="w-60 bg-foreground">
                  <SelectValue placeholder="Selecione um projeto" />
                </SelectTrigger>
                <SelectContent className="bg-foreground">
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
              <Button
                className="border border-primary text-primary bg-transparent font-bold 
            hover:bg-primary hover:text-white flex items-center gap-2"
              >
                <span>Novo projeto</span>
                <CirclePlus size={22} />
              </Button>
            </div>
          )}

          {currentFolder ? (
            <Breadcrumb className="mt-6">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbItem
                    className="text-white hover:text-primary hover:cursor-pointer"
                    onClick={() => router.refresh()}
                  >
                    Início
                  </BreadcrumbItem>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {currentFolder.folder && (
                  <>
                    <BreadcrumbItem className="text-white">...</BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbItem className="text-white hover:text-primary">
                        {currentFolder.folder.title}
                      </BreadcrumbItem>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </>
                )}
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-primary">
                    {currentFolder.title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          ) : (
            <h1 className="mt-6 font-semibold text-lg">Pastas do projeto</h1>
          )}

          <div className="w-full mt-6 px-10 grid grid-cols-4 gap-5">
            {content?.folders.map((folder) => (
              <FolderComponent
                key={folder.id}
                folder={folder}
                onFolderSelect={onFolderSelect}
              />
            ))}
          </div>

          {content && content.testCases.length > 0 && (
            <div className="mt-6">
              <h1 className="font-semibold text-lg text-center">
                Casos de testes
              </h1>
              <Testcases testCases={content.testCases} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) =>
  verifyToken(ctx)
