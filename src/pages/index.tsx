import { verifyToken } from '@/utils/verifyToken'
import { GetServerSideProps } from 'next'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Folder as FolderComponent,
  Header,
  Loading,
  TestCases,
  ProjectDropdown,
  ModalNewProject,
  ModalNewFolder,
} from '@/components'
import Head from 'next/head'
import { MouseEvent, useEffect, useState } from 'react'
import { useApi } from '@/hooks/useApi'
import { toast } from 'sonner'
import { Folder, Project, ProjectContent } from '@/types'

export default function Home({ token }: { token: string }) {
  const api = useApi()

  const [projects, setProjects] = useState<Project[]>([])
  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const [currentFolder, setCurrentFolder] = useState<Folder | null>(null)
  const [parentFolder, setParentFolder] = useState<Folder | null>(null)
  const [content, setContent] = useState<ProjectContent | null>(null)
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
    const [folderId] = id.split('-')
    const folder = content?.folders.find((f) => f.id === +folderId) ?? null

    setCurrentFolder(folder)
  }

  useEffect(() => {
    setIsLoading(true)
    api
      .getUserProjects(token)
      .then((response) => {
        const projectsResponse = response.data as Project[]

        setProjects(projectsResponse)
        setCurrentProject(projectsResponse[0] ?? null)
      })
      .catch((err) => {
        toast.error('Ocorreu um erro ao buscar os projetos')
        console.log(err)
      })
      .finally(() => setIsLoading(false))
  }, []) //eslint-disable-line

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

          setParentFolder(response.data.parent_folder)
        })
        .catch(() => {
          toast.error('Ocorreu um erro ao buscar o conteúdo')
        })
        .finally(() => setIsLoading(false))
    }
  }, [currentProject, currentFolder]) //eslint-disable-line

  return (
    <>
      <Head>
        <title>Testlab - Início</title>
      </Head>
      <Loading isLoading={isLoading} />
      <div className="min-h-screen bg-background pb-6">
        <Header />
        <div className="flex flex-col items-center">
          {!currentFolder && (
            <div className="flex justify-center items-center mt-6 gap-2">
              <h1 className="font-semibold text-xl">Selecione o projeto:</h1>
              <ProjectDropdown
                currentProject={currentProject}
                projects={projects}
                onProjectChange={onProjectChange}
              />
              <ModalNewProject />
            </div>
          )}

          {currentProject && (
            <>
              {currentFolder ? (
                <Breadcrumb className="mt-6">
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbItem
                        className="text-white hover:text-primary hover:cursor-pointer"
                        onClick={() => setCurrentFolder(null)}
                      >
                        Início
                      </BreadcrumbItem>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    {parentFolder && (
                      <>
                        <BreadcrumbItem className="text-white">
                          ...
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbItem
                            className="text-white hover:text-primary hover:cursor-pointer"
                            onClick={() => setCurrentFolder(parentFolder)}
                          >
                            {parentFolder.title}
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
                <div className="mt-6 flex items-center">
                  <h1 className="font-semibold text-lg">Pastas do projeto</h1>

                  <ModalNewFolder
                    currentProject={currentProject}
                    currentFolder={currentFolder}
                  />
                </div>
              )}
            </>
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
              <TestCases testCases={content.testCases} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) =>
  verifyToken(ctx)
