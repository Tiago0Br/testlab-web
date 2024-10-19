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
} from '@/components'

interface ModalNewFolderProps {
  onCreateFolder: (folderName: string) => Promise<void>
  children: ReactNode
}

export function ModalNewFolder({
  children,
  onCreateFolder,
}: ModalNewFolderProps) {
  const [folderName, setFolderName] = useState('')

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
    onCreateFolder(folderName.trim()).then(() => {
      closeModal()
      clearFields()
    })
  }

  return (
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
  )
}
