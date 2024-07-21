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
} from '..'
import { toast } from 'sonner'
import { useApi } from '@/hooks/useApi'
import { AuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { Folder, Project } from '@/types'

interface ModalNewFolderProps {
  currentProject: Project
  currentFolder?: Folder | null
}

export function ModalNewFolder({
  currentProject,
  currentFolder,
}: ModalNewFolderProps) {
  const [folderName, setFolderName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { token } = useContext(AuthContext)
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

    api
      .createNewFolder({
        token: token ?? '',
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
            <DialogTitle>Nova pasta</DialogTitle>
            <DialogDescription>Cadastro de uma nova pasta</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="folder-name" className="text-right">
                Nome
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
