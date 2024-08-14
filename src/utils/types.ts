export type Project = {
  id: number
  name: string
  description: string
}

export type Folder = {
  id: number
  title: string
  parent_folder?: Folder
  project?: Project
}

export enum TestCaseStatus {
  NotExecuted = 'NÃO EXECUTADO',
  Pass = 'PASSOU',
  Fail = 'COM FALHA',
  Blocked = 'BLOQUEADO',
  Executing = 'EM EXECUÇÃO',
  Cancelled = 'CANCELADO',
  Available = 'LIBERADO',
}

export type TestCase = {
  id: number
  title: string
  summary: string
  status: Status
  preconditions?: string
}

export type TestCaseWithAllStatus = {
  id: number
  title: string
  summary: string
  status: Status[]
  preconditions?: string
}

export type Status = {
  note: string
  created_at: string
  status: TestCaseStatus
}

export type Content = {
  parent_folder?: Folder
  folders: Folder[]
  test_cases: TestCase[]
}

export type User = {
  id: number
  name: string
  email: string
}
