export type Project = {
  id: number
  name: string
  description: string
}

export type Folder = {
  id: number
  title: string
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
  status: {
    note: string
    created_at: string
    status: TestCaseStatus
  }
  preconditions?: string
}

export type ProjectContent = {
  folders: Folder[]
  testCases: TestCase[]
}
