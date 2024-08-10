'use client'

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
  Button,
  ModalNewTestCase,
} from '@/components'
import Image from 'next/image'
import { MouseEvent, useEffect, useState } from 'react'
import { useApi } from '@/hooks/useApi'
import { toast } from 'sonner'
import { Folder, Project, ProjectContent } from '@/utils/types'
import { CirclePlus, FolderIcon, CircleCheckBig } from 'lucide-react'
import { getSessionToken } from '@/services/authService'

export default function Home() {
  const api = useApi()
  const [projects, setProjects] = useState<Project[]>([])
  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const [currentFolder, setCurrentFolder] = useState<Folder | null>(null)
  const [parentFolder, setParentFolder] = useState<Folder | null>(null)
  const [content, setContent] = useState<ProjectContent | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getSessionToken().then((sessionToken) => {
      setIsLoading(true)

      api
        .getUserProjects(sessionToken)
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
    })
    // console.log(token)
  }, []) //eslint-disable-line

  useEffect(() => {
    if (currentProject) {
      setIsLoading(true)

      getSessionToken().then((token) => {
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
      })
    }
  }, [currentProject, currentFolder]) //eslint-disable-line

  const onProjectChange = (projectId: string) => {
    const project =
      projects.find((project) => project.id === Number(projectId)) ?? null

    setCurrentProject(project)

    if (!project) {
      setContent(null)
      return
    }

    setIsLoading(true)

    getSessionToken().then((token) => {
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
    })
  }

  const onFolderSelect = (event: MouseEvent<HTMLDivElement>) => {
    const id = event.currentTarget.id
    const [folderId] = id.split('-')
    const folder = content?.folders.find((f) => f.id === +folderId) ?? null

    setCurrentFolder(folder)
  }

  return (
    <>
      <Loading isLoading={isLoading} />
      <div className="pb-6">
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
              {currentFolder && (
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
              )}

              {!content ||
                (content.folders.length === 0 &&
                  content.testCases.length === 0 && (
                    <div className="flex flex-col items-center">
                      <Image
                        src="/no-content.png"
                        alt="empty folder"
                        width={300}
                        height={300}
                      />
                      <h1>Adicione um conteúdo:</h1>
                      <div className="mt-4 flex gap-2">
                        <ModalNewFolder
                          currentProject={currentProject}
                          currentFolder={currentFolder}
                        >
                          <Button
                            className="w-44 border border-primary text-primary bg-transparent uppercase font-bold 
                          hover:bg-primary hover:text-white flex gap-2"
                          >
                            <FolderIcon size={24} />
                            Pasta
                          </Button>
                        </ModalNewFolder>
                        {currentFolder && (
                          <ModalNewTestCase currentFolder={currentFolder}>
                            <Button
                              className="w-44 border border-primary text-primary bg-transparent uppercase font-bold 
                            hover:bg-primary hover:text-white flex gap-2"
                            >
                              <CircleCheckBig size={24} />
                              Caso de testes
                            </Button>
                          </ModalNewTestCase>
                        )}
                      </div>
                    </div>
                  ))}

              {content &&
                (content.folders.length > 0 || content.testCases.length > 0) &&
                currentFolder && (
                  <div className="flex flex-col items-center">
                    <div className="mt-4 flex gap-2">
                      <ModalNewFolder
                        currentProject={currentProject}
                        currentFolder={currentFolder}
                      >
                        <Button
                          className="w-52 border border-primary text-primary bg-transparent uppercase font-bold 
                        hover:bg-primary hover:text-white flex gap-2"
                        >
                          <FolderIcon size={24} />
                          Nova pasta
                        </Button>
                      </ModalNewFolder>
                      {currentFolder && (
                        <ModalNewTestCase currentFolder={currentFolder}>
                          <Button
                            className="w-52 border border-primary text-primary bg-transparent uppercase font-bold 
                          hover:bg-primary hover:text-white flex gap-2"
                          >
                            <CircleCheckBig size={24} />
                            Novo caso de testes
                          </Button>
                        </ModalNewTestCase>
                      )}
                    </div>
                  </div>
                )}

              {content?.folders && content.folders.length > 0 && (
                <div className="mt-6 flex items-center">
                  <h1 className="font-semibold text-lg">
                    Pastas {!currentFolder && 'do projeto'}
                  </h1>

                  {!currentFolder && (
                    <ModalNewFolder
                      currentProject={currentProject}
                      currentFolder={currentFolder}
                    >
                      <Button
                        className="text-primary text-sm bg-transparent font-bold py-2 px-4 hover:text-secondary 
                      transition-colors"
                      >
                        <CirclePlus size={40} />
                      </Button>
                    </ModalNewFolder>
                  )}
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
