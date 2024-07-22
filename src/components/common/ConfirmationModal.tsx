import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '..'

interface ConfirmationModalProps {
  children: React.ReactNode
  title: string
  description: string
  onConfirm: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export function ConfirmationModal({
  children,
  title,
  description,
  onConfirm,
}: ConfirmationModalProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-primary hover:bg-secondary">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-700 hover:bg-red-500"
            onClick={onConfirm}
          >
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
