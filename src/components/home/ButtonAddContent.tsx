import { CircleCheckBig, Folder as FolderIcon } from 'lucide-react'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '..'

export function ButtonAddContent() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="border border-primary text-primary bg-transparent uppercase font-bold hover:bg-primary hover:text-white">
          Adicionar conteúdo
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 border-primary">
        <DropdownMenuLabel>Novo Item</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-primary" />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:text-primary cursor-pointer">
            <FolderIcon className="mr-2 h-4 w-4" />
            <span>Pasta</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:text-primary cursor-pointer">
            <CircleCheckBig className="mr-2 h-4 w-4" />
            <span>Caso de teste</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
