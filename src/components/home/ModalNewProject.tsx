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
} from '..'
import { toast } from 'sonner'
import { useApi } from '@/hooks/useApi'
import { AuthContext } from '@/context/AuthContext'

export function ModalNewProject() {
  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const api = useApi()
  const { token } = useContext(AuthContext)

  function handleSubmit() {
    if (projectName.trim() === '' || projectDescription.trim() === '') {
      return toast.error('Preencha todos os campos')
    }

    api
      .createNewProject(token ?? '', projectName, projectDescription)
      .then(() => {
        toast.success('Projeto criado com sucesso!')
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.message || 'Não foi possiível criar o projeto.'
        )
      })
  }

  return (
    <Dialog>
      <DialogTrigger
        className="border border-primary text-primary text-sm bg-transparent font-bold py-2 px-4 rounded-md
          hover:bg-primary hover:text-white transition-colors flex items-center gap-2"
      >
        <span>Novo projeto</span>
        <CirclePlus size={22} />
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
              Projeto
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
              Descrição
            </label>
            <Input
              id="project-description"
              placeholder="Breve descrição do projeto"
              className="col-span-3"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Cadastrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
