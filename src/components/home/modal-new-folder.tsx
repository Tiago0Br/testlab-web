'use client'

import { ReactNode, useState } from 'react'
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
} from '@/components'
import { toast } from 'sonner'
import { useApi } from '@/hooks/use-api'
import { useRouter } from 'next/navigation'
import { Folder, Project } from '@/utils/types'
import { getSessionToken } from '@/services/auth-service'

interface ModalNewFolderProps {
  currentProject: Project
  currentFolder?: Folder | null
  children: ReactNode
}

export function ModalNewFolder({
  currentProject,
  currentFolder,
  children,
}: ModalNewFolderProps) {
  const [folderName, setFolderName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const api = useApi()

  function hasEmptyField() {
    return folderName.trim() === ''
  }

  function handleSubmit() {
    if (hasEmptyField()) {
      return toast.error('Preencha todos os campos')
    }

    setIsLoading(true)

    getSessionToken().then((token) => {
      api
        .createNewFolder({
          token,
          title: folderName.trim(),
          project_id: currentProject.id,
          folder_id: currentFolder?.id,
        })
        .then(() => {
          toast.success('Pasta criada com sucesso!')

          setTimeout(() => {
            router.refresh()
          }, 800)
        })
        .catch((err) => {
          toast.error(
            err.response?.data?.message || 'Não foi possiível criar a pasta.'
          )
        })
        .finally(() => {
          setIsLoading(false)

          setFolderName('')
        })
    })
  }

  return (
    <>
      <Loading isLoading={isLoading} />
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Nova pasta</DialogTitle>
            <DialogDescription>Cadastro de uma nova pasta</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="folder-name" className="text-right">
                Nome*
              </label>
              <Input
                id="folder-name"
                className="col-span-3"
                placeholder="Nome da pasta"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
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
