'use client'

import { useState, Fragment } from 'react'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import {
  changeTestCaseStatus,
  getTestCaseById,
  listTestCaseStatus,
} from '@/api'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getStatusColor } from '@/utils/test-cases-status-color'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Loading,
  NotFound,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  TestCaseHistory,
  Textarea,
} from '@/components'

interface TestCasesPageProps {
  params: {
    id: string
  }
}

export default function TestCases({ params: { id } }: TestCasesPageProps) {
  const queryClient = useQueryClient()

  const { data: testCaseResponse, isLoading: isTestCaseLoading } = useQuery({
    queryKey: ['get-test-case'],
    queryFn: () => getTestCaseById(parseInt(id)),
  })

  const { data: statusOptionsResponse, isLoading: isStatusLoading } = useQuery({
    queryKey: ['list-test-case-status'],
    queryFn: listTestCaseStatus,
  })

  const [statusSelected, setStatusSelected] = useState('')
  const [note, setNote] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  function clearFields() {
    setStatusSelected('')
    setNote('')
  }

  function handleUpdateStatus() {
    setIsLoading(true)
    changeTestCaseStatus({
      status: statusSelected,
      note,
      testCaseId: parseInt(id),
    }).then(({ error }) => {
      setIsLoading(false)
      if (error) {
        toast.error(error)
        return
      }

      clearFields()
      queryClient.invalidateQueries({ queryKey: ['get-test-case'] })
      toast.success('Caso de teste atualizado com sucesso')
    })
  }

  function handleCancel() {
    setStatusSelected('')
    setNote('')
  }

  const testCase = testCaseResponse?.data
  const statusOptions = statusOptionsResponse?.data ?? []

  function redirectToPreviousTestCase() {
    router.push(`/testcases/${testCase?.previous_test_case_id}`)
  }

  function redirectToNextTestCase() {
    router.push(`/testcases/${testCase?.next_test_case_id}`)
  }

  if (isTestCaseLoading || isStatusLoading || isLoading) {
    return <Loading />
  }

  if (!testCase) {
    return <NotFound />
  }

  return (
    <div className="flex flex-col items-center pb-6 pt-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem
            className="text-white hover:text-primary hover:cursor-pointer"
            onClick={() => router.push('/')}
          >
            Início
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="text-white">...</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbItem
              className="text-white hover:text-primary hover:cursor-pointer"
              onClick={() => router.push(`/folders/${testCase.test_suite.id}`)}
            >
              {testCase.test_suite.title}
            </BreadcrumbItem>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-primary">
              {testCase.title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-8">
        <div className="flex justify-center items-center gap-4">
          <h1 className="text-2xl font-semibold">{testCase.title}</h1>

          <div
            className={`py-1 px-2 rounded-md text-center font-semibold ${getStatusColor(
              testCase.status.description
            )}`}
          >
            {testCase.status.description}
          </div>
        </div>

        <div className="mt-4">
          <TestCaseHistory history={testCase.history} />
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-semibold">Sumário:</h3>
          <p>{testCase.summary}</p>
        </div>

        {testCase.preconditions && (
          <div className="mt-10">
            <h3 className="text-xl font-semibold">Precondições:</h3>
            <p>{testCase.preconditions}</p>
          </div>
        )}
      </div>

      <div className="mt-10 flex items-center gap-4">
        <p className="text-xl font-semibold">Alterar status:</p>
        <Select value={statusSelected} onValueChange={setStatusSelected}>
          <SelectTrigger className="w-60 bg-foreground">
            <SelectValue placeholder="Selecione um status" />
          </SelectTrigger>
          <SelectContent className="bg-foreground">
            {statusOptions.map((status) => (
              <Fragment key={status.value}>
                {!status.disabled && (
                  <SelectItem
                    value={status.value}
                    className="text-white hover:cursor-pointer hover:bg-gray-600"
                  >
                    {status.label}
                  </SelectItem>
                )}
              </Fragment>
            ))}
          </SelectContent>
        </Select>
      </div>

      {statusSelected && (
        <div className="w-[400px] flex flex-col mt-6 gap-4">
          <Textarea
            placeholder="Observações"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <div className="w-full flex gap-2">
            <Button
              className="flex-1 bg-red-700 hover:bg-red-500"
              onClick={handleCancel}
            >
              Cancelar
            </Button>
            <Button
              className="flex-1 hover:bg-secondary"
              onClick={handleUpdateStatus}
            >
              Atualizar
            </Button>
          </div>
        </div>
      )}

      <div className="mt-8 flex justify-center gap-4">
        <Button
          data-visible={!!testCase.previous_test_case_id}
          onClick={redirectToPreviousTestCase}
          className="
            data-[visible=false]:hidden w-40 border border-primary text-primary bg-transparent uppercase font-bold 
            hover:bg-primary hover:text-white flex justify-center items-center gap-2
          "
        >
          <ChevronLeft size={24} />
          Anterior
        </Button>

        <Button
          data-visible={!!testCase.next_test_case_id}
          onClick={redirectToNextTestCase}
          className="
            data-[visible=false]:hidden w-40 border border-primary text-primary bg-transparent uppercase font-bold 
            hover:bg-primary hover:text-white flex justify-center items-center gap-2
          "
        >
          Próximo
          <ChevronRight size={24} />
        </Button>
      </div>
    </div>
  )
}
