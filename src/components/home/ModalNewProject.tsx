'use client'

import { useContext, useState } from 'react'
import { CirclePlus } from 'lucide-react'
import {
  Dialog,
  DialogTrigger,
  Button,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Input,
  DialogFooter,
  Loading,
  Textarea,
} from '@/components'
import { toast } from 'sonner'
import { useApi } from '@/hooks/useApi'
import { AuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export function ModalNewProject() {
  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { token } = useContext(AuthContext)
  const router = useRouter()
  const api = useApi()

  function hasEmptyField() {
    return projectName.trim() === '' || projectDescription.trim() === ''
  }

  function handleSubmit() {
    if (hasEmptyField()) {
      return toast.error('Preencha todos os campos')
    }

    setIsLoading(true)

    api
      .createNewProject(token ?? '', projectName.trim(), projectDescription)
      .then(() => {
        toast.success('Projeto criado com sucesso!')
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.message || 'Não foi possiível criar o projeto.'
        )
      })
      .finally(() => {
        setIsLoading(false)

        setProjectName('')
        setProjectDescription('')

        setTimeout(() => {
          router.refresh()
        }, 800)
      })
  }

  return (
    <>
      <Loading isLoading={isLoading} />
      <Dialog>
        <DialogTrigger
          className="text-primary text-sm bg-transparent font-bold py-2 px-4
          hover:text-secondary transition-colors"
        >
          <CirclePlus size={40} />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Novo projeto</DialogTitle>
            <DialogDescription>
              Cadastro de um novo projeto de testes
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="project-name" className="text-right">
                Projeto*
              </label>
              <Input
                id="project-name"
                className="col-span-3"
                placeholder="Nome do projeto"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="project-description" className="text-right">
                Descrição*
              </label>
              <Textarea
                id="project-description"
                placeholder="Breve descrição do projeto"
                className="col-span-3 resize-none"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              className="hover:bg-secondary"
              onClick={handleSubmit}
              disabled={hasEmptyField()}
            >
              Cadastrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
