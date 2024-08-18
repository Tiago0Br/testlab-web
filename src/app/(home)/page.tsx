'use client'

import {
  Folder as FolderComponent,
  Header,
  Loading,
  TestCases,
  ProjectDropdown,
  ModalNewProject,
  ModalNewFolder,
  Button,
} from '@/components'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useApi } from '@/hooks/useApi'
import { toast } from 'sonner'
import { Project, Content } from '@/utils/types'
import { CirclePlus, FolderIcon } from 'lucide-react'
import { getSessionToken } from '@/services/authService'
import { useRouter } from 'next/navigation'

export default function Home() {
  const api = useApi()
  const [projects, setProjects] = useState<Project[]>([])
  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const [content, setContent] = useState<Content | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  function selectFolder(folderId: number) {
    router.push(`/folders/${folderId}`)
  }

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
  }, []) //eslint-disable-line

  useEffect(() => {
    if (currentProject) {
      setIsLoading(true)

      getSessionToken().then((token) => {
        api
          .getProjectContent(token, currentProject.id)
          .then((response) => {
            setContent(response.data)
          })
          .catch(() => {
            toast.error('Ocorreu um erro ao buscar o conteúdo')
          })
          .finally(() => setIsLoading(false))
      })
    }
  }, [currentProject]) //eslint-disable-line

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
          setContent(response.data)
        })
        .catch((err) => {
          toast.error('Ocorreu um erro ao buscar o conteúdo do projeto')
          console.log(err)
        })
        .finally(() => setIsLoading(false))
    })
  }

  return (
    <>
      <Loading isLoading={isLoading} />
      <div className="pb-6">
        <div className="flex flex-col items-center">
          <div className="flex justify-center items-center mt-6 gap-2">
            <h1 className="font-semibold text-xl">Selecione o projeto:</h1>
            <ProjectDropdown
              currentProject={currentProject}
              projects={projects}
              onProjectChange={onProjectChange}
            />
            <ModalNewProject />
          </div>

          {currentProject && (
            <>
              {!content ||
                (content.folders.length === 0 &&
                  content.test_cases.length === 0 && (
                    <div className="flex flex-col items-center">
                      <Image
                        src="/no-content.png"
                        alt="empty folder"
                        width={300}
                        height={300}
                      />
                      <h1>Sem conteúdo D:</h1>
                      <div className="mt-4 flex gap-2">
                        <ModalNewFolder currentProject={currentProject}>
                          <Button
                            className="w-44 border border-primary text-primary bg-transparent uppercase font-bold 
                          hover:bg-primary hover:text-white flex gap-2"
                          >
                            <FolderIcon size={24} />
                            Nova Pasta
                          </Button>
                        </ModalNewFolder>
                      </div>
                    </div>
                  ))}

              {content?.folders && content.folders.length > 0 && (
                <div className="mt-6 flex items-center">
                  <h1 className="font-semibold text-lg">Pastas do projeto</h1>

                  <ModalNewFolder currentProject={currentProject}>
                    <Button
                      className="text-primary text-sm bg-transparent font-bold py-2 px-4 hover:text-secondary 
                      transition-colors"
                    >
                      <CirclePlus size={40} />
                    </Button>
                  </ModalNewFolder>
                </div>
              )}
            </>
          )}

          <div className="w-full mt-6 px-10 grid grid-cols-4 gap-5">
            {content?.folders.map((folder) => (
              <FolderComponent
                key={folder.id}
                folder={folder}
                onFolderSelect={() => selectFolder(folder.id)}
              />
            ))}
          </div>

          {content && content.test_cases.length > 0 && (
            <div className="mt-6">
              <h1 className="font-semibold text-lg text-center">
                Casos de testes
              </h1>
              <TestCases testCases={content.test_cases} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
