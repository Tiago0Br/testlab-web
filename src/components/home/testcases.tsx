'use client'

import { Eye, Pencil, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { getStatusColor } from '@/utils/test-cases-status-color'
import { deleteTestCase, saveTestCase, TestCase } from '@/api'
import {
  ConfirmationModal,
  ModalSaveTestCase,
  OnSaveTestCaseProps,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components'

interface TestCasesProps {
  testCases: TestCase[]
}

export function TestCases({ testCases }: TestCasesProps) {
  const router = useRouter()
  const queryClient = useQueryClient()

  function handleDeleteTestCase(testCaseId: number) {
    deleteTestCase(testCaseId).then(({ error }) => {
      if (error) {
        toast.error(error)
        return
      }

      queryClient.invalidateQueries({ queryKey: ['get-folder-content'] })
      toast.success('Caso de teste excluído com sucesso!')
    })
  }

  function handleGetTestCase(testCaseId: number) {
    router.push(`/testcases/${testCaseId}`)
  }

  async function onUpdateTestCase({ id, title, summary, preconditions }: OnSaveTestCaseProps) {
    const testSuiteId = parseInt(document.getElementById('folder-id')!.nodeValue!)

    const { error } = await saveTestCase({
      id,
      title,
      summary,
      preconditions: preconditions !== '' ? preconditions : undefined,
      test_suite_id: testSuiteId
    })

    if (error) {
      toast.error(error)
      return
    }

    queryClient.invalidateQueries({ queryKey: ['get-folder-content'] })
    toast.success('Caso de testes atualizado com sucesso!')
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
              <ModalSaveTestCase testCase={testCase} onSaveTestCase={onUpdateTestCase}>
                <button
                  title="Editar"
                  className="p-1 bg-orange-400 rounded-md hover:bg-orange-300 transition-colors"
                >
                  <Pencil size={24} className="text-white" />
                </button>
              </ModalSaveTestCase>
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
