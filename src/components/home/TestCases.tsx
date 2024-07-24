import {
  ConfirmationModal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components'
import { AuthContext } from '@/context/AuthContext'
import { useApi } from '@/hooks/useApi'
import { TestCase, TestCaseStatus } from '@/types'
import { Eye, Pencil, Trash2 } from 'lucide-react'
import { useContext } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface TestCasesProps {
  testCases: TestCase[]
}

export function TestCases({ testCases }: TestCasesProps) {
  const api = useApi()
  const { token } = useContext(AuthContext)
  const router = useRouter()

  function getStatusColor(status: TestCaseStatus) {
    switch (status) {
      case TestCaseStatus.Available:
        return 'bg-cyan-500'
      case TestCaseStatus.Blocked:
        return 'bg-purple-800'
      case TestCaseStatus.Cancelled:
        return 'bg-gray-700'
      case TestCaseStatus.Executing:
        return 'bg-blue-500'
      case TestCaseStatus.Fail:
        return 'bg-red-500'
      case TestCaseStatus.NotExecuted:
        return 'bg-gray-500'
      case TestCaseStatus.Pass:
        return 'bg-green-500'
    }
  }

  function handleDeleteTestCase(testCaseId: number) {
    api
      .deleteTestCase(token ?? '', testCaseId)
      .then(() => {
        toast.success('Caso de teste excluído com sucesso!')
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.message ||
            'Ocorreu um erro ao excluir o caso de teste'
        )
      })
  }

  function handleGetTestCase(testCaseId: number) {
    router.push(`/testcases/?id=${testCaseId}`)
  }

  return (
    <Table className="bg-foreground rounded-lg mt-6 min-w-[600px]">
      <TableHeader>
        <TableRow>
          <TableHead>Título</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {testCases.map((testCase) => (
          <TableRow key={testCase.id}>
            <TableCell>{testCase.title}</TableCell>
            <TableCell>
              <div
                className={`py-1 rounded-md text-center font-semibold ${getStatusColor(
                  testCase.status.status
                )}`}
              >
                {testCase.status.status}
              </div>
            </TableCell>
            <TableCell className="flex items-center gap-2">
              <button
                className="p-1 bg-blue-500 rounded-md hover:bg-blue-400"
                onClick={() => handleGetTestCase(testCase.id)}
              >
                <Eye size={24} className="text-white" />
              </button>
              <button className="p-1 bg-orange-400 rounded-md hover:bg-orange-300">
                <Pencil size={24} className="text-white" />
              </button>
              <ConfirmationModal
                title="Deseja excluir o caso de teste?"
                description="Essa operação não pode ser desfeita."
                onConfirm={() => handleDeleteTestCase(testCase.id)}
              >
                <button className="p-1 bg-red-500 rounded-md hover:bg-red-400">
                  <Trash2 size={24} className="text-white" />
                </button>
              </ConfirmationModal>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
