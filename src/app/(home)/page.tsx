'use client'

import {
  Folder as FolderComponent,
  Loading,
  ProjectDropdown,
  ModalNewProject,
  ModalNewFolder,
  Button,
} from '@/components'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { FolderIcon } from 'lucide-react'
import { getSessionToken } from '@/services/auth-service'
import { useRouter } from 'next/navigation'
import {
  getProjectContent,
  getUserProjects,
  Project,
  ProjectContent,
} from '@/api'

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([])
  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const [content, setContent] = useState<ProjectContent | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const hasContent = content !== null
  const hasAnyFolder = hasContent && content.folders.length > 0

  function selectFolder(folderId: number) {
    router.push(`/folders/${folderId}`)
  }

  useEffect(() => {
    getSessionToken().then((sessionToken) => {
      setIsLoading(true)

      getUserProjects(sessionToken).then(({ data, error }) => {
        setIsLoading(false)
        if (error) {
          toast.error(error)
          return
        }

        const projectsResponse = data as Project[]
        setProjects(projectsResponse)
        setCurrentProject(projectsResponse[0] ?? null)
      })
    })
  }, [])

  useEffect(() => {
    if (currentProject) {
      setIsLoading(true)

      getSessionToken().then((token) => {
        getProjectContent(token, currentProject.id).then(({ data, error }) => {
          setIsLoading(false)
          if (error) {
            toast.error(error)
            return
          }

          setContent(data!)
        })
      })
    }
  }, [currentProject])

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
      getProjectContent(token, currentProject!.id).then(({ data, error }) => {
        setIsLoading(false)
        if (error) {
          toast.error(error)
          return
        }

        setContent(data!)
      })
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
              {!hasAnyFolder && (
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
              )}

              {hasAnyFolder && (
                <div className="mt-6 flex flex-col items-center gap-4">
                  <h1 className="font-semibold text-lg">Pastas do projeto</h1>

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
              )}
            </>
          )}

          <div className="w-full mt-6 px-10 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {content?.folders.map((folder) => (
              <FolderComponent
                key={folder.id}
                folder={folder}
                onFolderSelect={() => selectFolder(folder.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
