'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { CirclePlus, FolderIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Folder as FolderComponent,
  Loading,
  ProjectDropdown,
  ModalNewFolder,
  Button,
} from '@/components'
import {
  createFolder,
  getProjectContent,
  getUserProjects,
  Project,
} from '@/api'

export default function Home() {
  const queryClient = useQueryClient()

  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const router = useRouter()

  const { data: projectsResponse, isLoading: isProjectsLoading } = useQuery({
    queryKey: ['get-user-projects'],
    queryFn: getUserProjects,
  })

  const projects = projectsResponse?.data ?? []

  const { data: contentResponse, isLoading: isContentLoading } = useQuery({
    queryKey: ['get-project-content'],
    queryFn: () => getProjectContent(currentProject!.id),
    enabled: !!currentProject,
  })

  const content = contentResponse?.data ?? null

  const hasContent = content !== null
  const hasAnyFolder = hasContent && content.folders.length > 0

  function selectFolder(folderId: number) {
    router.push(`/folders/${folderId}`)
  }

  useEffect(() => {
    setCurrentProject(projects[0] ?? null)
  }, [projects])

  useEffect(() => {
    if (currentProject) {
      queryClient.invalidateQueries({ queryKey: ['get-project-content'] })
    }
  }, [currentProject, queryClient])

  const onProjectChange = (projectId: string) => {
    const project = projects.find(({ id }) => id === Number(projectId)) ?? null

    setCurrentProject(project)

    queryClient.invalidateQueries({ queryKey: ['get-project-content'] })
  }

  async function onCreateFolder(folderName: string) {
    createFolder({
      title: folderName,
      project_id: currentProject!.id,
    }).then(({ error, data }) => {
      if (error || !data) {
        toast.error(error)
        return
      }

      queryClient.invalidateQueries({ queryKey: ['get-project-content'] })
      toast.success('Pasta criada com sucesso!')
    })
  }

  if (isProjectsLoading || isContentLoading) {
    return <Loading />
  }

  return (
    <div className="pb-6">
      <div className="flex flex-col items-center">
        <div className="flex justify-center items-center mt-6 gap-2">
          <h1 className="font-semibold text-xl">Selecione o projeto:</h1>
          <ProjectDropdown
            currentProject={currentProject}
            projects={projects}
            onProjectChange={onProjectChange}
          />
          <a href="/projects/new" className="text-primary">
            <CirclePlus size={40} />
          </a>
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
                  <ModalNewFolder onCreateFolder={onCreateFolder}>
                    <Button className="w-44 border border-primary text-primary bg-transparent uppercase font-bold hover:bg-primary hover:text-white flex gap-2">
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

                <ModalNewFolder onCreateFolder={onCreateFolder}>
                  <Button className="w-44 border border-primary text-primary bg-transparent uppercase font-bold hover:bg-primary hover:text-white flex gap-2">
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
  )
}
