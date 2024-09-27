'use client'

import { ReactNode, useState } from 'react'
import {
  Dialog,
  DialogTrigger,
  Button,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Input,
  DialogFooter,
  Loading,
} from '@/components'
import { toast } from 'sonner'

interface ModalNewFolderProps {
  onCreateFolder: (folderName: string) => Promise<void>
  children: ReactNode
}

export function ModalNewFolder({
  children,
  onCreateFolder,
}: ModalNewFolderProps) {
  const [folderName, setFolderName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  function hasEmptyField() {
    return folderName.trim() === ''
  }

  function clearFields() {
    setFolderName('')
  }

  function closeModal() {
    document.getElementById('close-modal-new-folder')!.click()
  }

  function handleSubmit() {
    if (hasEmptyField()) {
      return toast.error('Preencha todos os campos')
    }

    setIsLoading(true)

    onCreateFolder(folderName.trim()).then(() => {
      closeModal()
      setIsLoading(false)
      clearFields()
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
            <DialogClose id="close-modal-new-folder" />
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
