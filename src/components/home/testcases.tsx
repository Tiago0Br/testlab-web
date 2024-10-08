'use client'

import {
  ConfirmationModal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components'
import { Eye, Pencil, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { getStatusColor } from '@/utils/test-cases-status-color'
import { getSessionToken } from '@/services/auth-service'
import { deleteTestCase, TestCase } from '@/api'

interface TestCasesProps {
  testCases: TestCase[]
}

export function TestCases({ testCases }: TestCasesProps) {
  const router = useRouter()

  function handleDeleteTestCase(testCaseId: number) {
    getSessionToken().then((token) => {
      deleteTestCase(token, testCaseId).then(({ error }) => {
        if (error) {
          toast.error(error)
          return
        }

        toast.success('Caso de teste excluído com sucesso!')
      })
    })
  }

  function handleGetTestCase(testCaseId: number) {
    router.push(`/testcases/${testCaseId}`)
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
            <TableCell className="max-w-[400px]">{testCase.title}</TableCell>
            <TableCell>
              <div
                className={`py-1 px-2 rounded-md text-center font-semibold ${getStatusColor(
                  testCase.status.description
                )}`}
              >
                {testCase.status.description}
              </div>
            </TableCell>
            <TableCell className="flex items-center gap-2">
              <button
                title="Visualizar"
                className="p-1 bg-blue-500 rounded-md hover:bg-blue-400 transition-colors"
                onClick={() => handleGetTestCase(testCase.id)}
              >
                <Eye size={24} className="text-white" />
              </button>
              <button
                title="Editar"
                className="p-1 bg-orange-400 rounded-md hover:bg-orange-300 transition-colors"
              >
                <Pencil size={24} className="text-white" />
              </button>
              <ConfirmationModal
                title="Deseja excluir o caso de teste?"
                description="Essa operação não pode ser desfeita."
                onConfirm={() => handleDeleteTestCase(testCase.id)}
              >
                <button
                  title="Excluir"
                  className="p-1 bg-red-500 rounded-md hover:bg-red-400 transition-colors"
                >
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
