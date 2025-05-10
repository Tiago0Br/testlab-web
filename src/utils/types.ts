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
  Available = 'LIBERADO'
}

export type TestCase = {
  id: number
  title: string
  summary: string
  status: Status
  preconditions?: string
}

export type TestCaseDetails = {
  id: number
  title: string
  summary: string
  status: Status
  history: Status[]
  preconditions?: string
  test_suite: Folder
  previous_test_case_id?: number
  next_test_case_id?: number
}

export type Status = {
  note: string
  created_at: string
  description: TestCaseStatus
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
