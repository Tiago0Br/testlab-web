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
import { Folder, Project } from '@/utils/types'
import { getSessionToken } from '@/services/auth-service'
import { createFolder } from '@/api'

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

  function hasEmptyField() {
    return folderName.trim() === ''
  }

  function clearFields() {
    setFolderName('')
  }

  function handleSubmit() {
    if (hasEmptyField()) {
      return toast.error('Preencha todos os campos')
    }

    setIsLoading(true)

    getSessionToken().then((token) => {
      createFolder({
        title: folderName.trim(),
        folder_id: currentFolder?.id,
        project_id: currentProject.id,
        token,
      }).then(({ error }) => {
        setIsLoading(false)
        if (error) {
          toast.error(error)
          return
        }

        clearFields()
        toast.success('Pasta criada com sucesso!')
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
