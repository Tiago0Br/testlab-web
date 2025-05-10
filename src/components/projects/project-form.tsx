'use client'

import { FormEvent, useState } from 'react'
import { CustomInput } from '../common'
import { Button, Textarea } from '../ui'
import { createProject, updateProject, Project } from '@/api'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

interface ProjectFormProps {
  project?: Project
}

export function ProjectForm({ project }: ProjectFormProps) {
  const [projectName, setProjectName] = useState(project?.name ?? '')
  const [projectDescription, setProjectDescription] = useState(project?.description ?? '')

  const queryClient = useQueryClient()

  async function handleCreateProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const { error, data } = await createProject({
      name: projectName,
      description: projectDescription
    })

    if (error || !data) {
      toast.error(error)
      return
    }

    queryClient.invalidateQueries({ queryKey: ['get-user-projects'] })
    toast.success('Projeto criado com sucesso!')

    setProjectName('')
    setProjectDescription('')
  }

  async function handleUpdateProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const { error, data } = await updateProject({
      id: project!.id,
      name: projectName,
      description: projectDescription
    })

    if (error || !data) {
      toast.error(error)
      return
    }

    queryClient.invalidateQueries({ queryKey: ['get-user-projects'] })
    toast.success('Projeto atualizado com sucesso!')
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-20 bg-foreground w-[390px] rounded-xl flex flex-col gap-10 items-center py-10">
        <form
          className="flex flex-col items-center gap-6 w-72"
          onSubmit={project ? handleUpdateProject : handleCreateProject}
        >
          <CustomInput
            type="text"
            placeholder="Nome do projeto"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <Textarea
            className="bg-foreground"
            placeholder="Descrição do projeto"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
          <div>
            <Button
              type="submit"
              className="w-full border border-primary text-primary bg-transparent uppercase font-bold hover:bg-primary hover:text-white"
            >
              {project ? 'Atualizar' : 'Cadastrar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
