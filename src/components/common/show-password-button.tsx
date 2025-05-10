import { EyeIcon, EyeOffIcon } from 'lucide-react'

interface ShowPasswordButtonProps {
  showPassword: boolean
  onClick: () => void
}

export function ShowPasswordButton({ showPassword, onClick }: ShowPasswordButtonProps) {
  return (
    <button type="button" onClick={onClick} className="absolute top-2 right-2">
      {showPassword ? (
        <EyeOffIcon className="text-primary" size={20} />
      ) : (
        <EyeIcon className="text-primary" size={20} />
      )}
    </button>
  )
}
