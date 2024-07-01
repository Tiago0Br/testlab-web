import { verifyToken } from '@/utils/verifyToken'
import { GetServerSideProps } from 'next'
import {
  Alert,
  AlertTitle,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Header,
  Loading,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components'
import Head from 'next/head'
import { MouseEvent, useEffect, useState } from 'react'
import { useApi } from '@/hooks/useApi'
import { toast } from 'sonner'
import { Folder as FolderIcon, CirclePlus } from 'lucide-react'

type Project = {
  id: number
  name: string
  description: string
}

type Folder = {
  id: number
  title: string
  folder?: Folder
}

type TestCase = {
  id: number
  title: string
  summary: string
  preconditions?: string
}

type ProjectContent = {
  folders: Folder[]
  testCases: TestCase[]
}

export default function Home({ token }: { token: string }) {
  const api = useApi()
  const [projects, setProjects] = useState<Project[]>([])
  const [content, setContent] = useState<ProjectContent | null>(null)
  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null)
  const [isLoading, setIsLoading] = useState(false)

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
    const [folderId, folderTitle] = id.split('-')
    setSelectedFolder({
      id: Number(folderId),
      title: folderTitle,
      folder: selectedFolder ?? undefined,
    })

    setIsLoading(true)

    api
      .getProjectContent(token, currentProject?.id!, Number(folderId))
      .then((response) => {
        setContent({
          folders: response.data.folders,
          testCases: response.data.test_cases,
        })
      })
      .catch((err) => {
        toast.error('Ocorreu um erro ao buscar o conteúdo da pasta')
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
  return (
    <>
      <Head>
        <title>Testlab - Início</title>
      </Head>
      <Loading isLoading={isLoading} />
      <div className="h-screen bg-gray-900">
        <Header />
        <div className="flex flex-col items-center">
          {!selectedFolder && (
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
              <Button
                className="border border-green-500 text-green-500 bg-transparent font-bold 
            hover:bg-green-500 hover:text-white flex items-center gap-2"
              >
                <span>Novo projeto</span>
                <CirclePlus size={22} />
              </Button>
            </div>
          )}

          {selectedFolder ? (
            <Breadcrumb className="mt-6">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbItem className="text-white hover:text-green-500">
                    Início
                  </BreadcrumbItem>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {selectedFolder.folder && (
                  <>
                    <BreadcrumbItem className="text-white">...</BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbItem className="text-white hover:text-green-500">
                        {selectedFolder.folder.title}
                      </BreadcrumbItem>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </>
                )}
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-green-500">
                    {selectedFolder.title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          ) : (
            <h1 className="mt-6 font-semibold text-lg">Pastas do projeto</h1>
          )}

          <div className="w-full mt-6 px-10 grid grid-cols-4 gap-5">
            {content?.folders.map((folder) => (
              <Alert
                key={folder.id}
                id={`${folder.id}-${folder.title}`}
                className="flex items-center gap-2 bg-gray-800 border-none hover:cursor-pointer"
                onClick={onFolderSelect}
              >
                <div>
                  <FolderIcon size={24} className="fill-white" />
                </div>
                <AlertTitle className="text-white leading-normal mb-0">
                  {folder.title}
                </AlertTitle>
              </Alert>
            ))}
          </div>

          {content && content.testCases.length > 0 && (
            <div className="mt-6">
              <h1 className="font-semibold text-lg">Testes</h1>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Título</TableHead>
                    <TableHead>Resumo</TableHead>
                    <TableHead>Pré-condições</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {content.testCases.map((testCase) => (
                    <TableRow key={testCase.id}>
                      <TableCell className="font-medium">
                        {testCase.title}
                      </TableCell>
                      <TableCell>{testCase.summary}</TableCell>
                      <TableCell>{testCase.preconditions}</TableCell>
                      <TableCell className="text-right">
                        {testCase.title}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) =>
  verifyToken(ctx)
