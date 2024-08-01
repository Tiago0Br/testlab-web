import { Project } from '@/utils/types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components'

interface ProjectDropdownProps {
  projects: Project[]
  currentProject: Project | null
  onProjectChange: (value: string) => void
}

export function ProjectDropdown({
  projects,
  currentProject,
  onProjectChange,
}: ProjectDropdownProps) {
  return (
    <Select
      onValueChange={onProjectChange}
      value={currentProject ? `${currentProject.id}` : undefined}
    >
      <SelectTrigger className="w-60 bg-foreground">
        <SelectValue placeholder="Selecione um projeto" />
      </SelectTrigger>
      <SelectContent className="bg-foreground">
        {projects.map((project) => (
          <SelectItem
            key={project.id}
            value={`${project.id}`}
            className="text-white hover:cursor-pointer hover:bg-gray-600"
          >
            {project.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
