import { Folder as FolderType } from '@/utils/types'
import { Alert, AlertTitle } from '@/components'
import { FolderIcon, Pencil, Trash2 } from 'lucide-react'
import { MouseEvent } from 'react'
import { deleteFolder } from '@/api'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'

interface FolderProps {
  folder: FolderType
  onFolderSelect: (event: MouseEvent<HTMLDivElement>) => void
}

export function Folder({ folder, onFolderSelect }: FolderProps) {
  const queryClient = useQueryClient()

  async function handleDeleteFolder(folderId: number) {
    const { error } = await deleteFolder(folderId)

    if (error) {
      toast.error(error)
      return
    }

    toast.success('Pasta excluída com sucesso!')
    queryClient.invalidateQueries({
      queryKey: ['get-folder-content', folder.id.toString()]
    })
    queryClient.invalidateQueries({ queryKey: ['get-project-content'] })
  }

  return (
    <Alert
      key={folder.id}
      id={`${folder.id}-${folder.title}`}
      className="group flex items-center justify-between bg-foreground border-none hover:cursor-pointer hover:bg-zinc-800"
      onClick={onFolderSelect}
    >
      <div className="flex items-center gap-2">
        <div>
          <FolderIcon size={24} className="fill-gray-400" />
        </div>
        <AlertTitle className="text-white leading-normal mb-0">{folder.title}</AlertTitle>
      </div>
      <div className="invisible group-hover:visible flex gap-1">
        <button
          title="Editar"
          className="text-orange-400 rounded-md hover:text-orange-300 transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <Pencil size={22} />
        </button>
        <button
          title="Excluir"
          className="text-red-500 rounded-md hover:text-red-400 transition-colors"
          onClick={(e) => {
            e.stopPropagation()
            handleDeleteFolder(folder.id)
          }}
        >
          <Trash2 size={22} />
        </button>
      </div>
    </Alert>
  )
}
