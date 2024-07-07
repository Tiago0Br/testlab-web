export type Project = {
  id: number
  name: string
  description: string
}

export type Folder = {
  id: number
  title: string
}

export type TestCase = {
  id: number
  title: string
  summary: string
  preconditions?: string
}

export type ProjectContent = {
  folders: Folder[]
  testCases: TestCase[]
}
