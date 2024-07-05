import { Folder as FolderType } from '@/types'
import { Alert, AlertTitle } from '..'
import { FolderIcon } from 'lucide-react'
import { MouseEvent } from 'react'

interface FolderProps {
  folder: FolderType
  onFolderSelect: (event: MouseEvent<HTMLDivElement>) => void
}

export function Folder({ folder, onFolderSelect }: FolderProps) {
  return (
    <Alert
      key={folder.id}
      id={`${folder.id}-${folder.title}`}
      className="flex items-center gap-2 bg-foreground border-none hover:cursor-pointer"
      onClick={onFolderSelect}
    >
      <div>
        <FolderIcon size={24} className="fill-gray-400" />
      </div>
      <AlertTitle className="text-white leading-normal mb-0">
        {folder.title}
      </AlertTitle>
    </Alert>
  )
}
