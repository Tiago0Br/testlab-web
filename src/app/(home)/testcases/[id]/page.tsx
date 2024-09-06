'use client'

import { TestCaseDetails } from '@/utils/types'
import { getStatusColor } from '@/utils/testCasesStatusColor'
import { getSessionToken } from '@/services/authService'
import { apiService as api } from '@/services/apiService'
import { useEffect, useState, Fragment } from 'react'
import { isAxiosError } from 'axios'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { toast } from 'sonner'
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
  Textarea,
} from '@/components'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface TestCasesPageProps {
  params: {
    id: string
  }
}

interface TestCaseStatus {
  value: string
  label: string
  disabled?: boolean
}

export default function TestCases({ params: { id } }: TestCasesPageProps) {
  const [testCase, setTestCase] = useState<TestCaseDetails | null>(null)
  const [statusOptions, setStatusOptions] = useState<TestCaseStatus[]>([])
  const [statusSelected, setStatusSelected] = useState('')
  const [note, setNote] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    getSessionToken().then((token) => {
      setIsLoading(true)

      const getTestCaseById = api.getTestCaseById(token, +id)
      const listTestCaseStatus = api.listTestCaseStatus(token)

      Promise.all([getTestCaseById, listTestCaseStatus])
        .then((response) => {
          const currentTestCase = response[0].data as TestCaseDetails
          setTestCase(currentTestCase)

          setStatusOptions(response[1].data)
        })
        .catch((error) => {
          let message = 'Erro ao buscar o caso de testes.'
          if (isAxiosError(error)) {
            message = error.response?.data?.message as string
          }

          toast.error(message)
        })
        .finally(() => {
          setIsLoading(false)
        })
    })
  }, [id])

  function handleUpdateStatus() {
    getSessionToken().then((token) => {
      setIsLoading(true)
      api
        .changeTestCaseStatus(token, parseInt(id), statusSelected, note)
        .then(() => {
          toast.success('Caso de teste atualizado com sucesso')
        })
        .catch((err) => {
          toast.error(
            err.response?.data?.message ||
              'Erro ao atualizar o caso de teste. Tente novamente'
          )
        })
        .finally(() => {
          setIsLoading(false)
        })
    })
  }

  function handleCancel() {
    setStatusSelected('')
    setNote('')
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {testCase ? (
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
                      onClick={() =>
                        router.push(`/folders/${testCase.test_suite.id}`)
                      }
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

              <div className="flex items-center gap-20">
                <Link
                  data-visible={!!testCase.previous_test_case_id}
                  href={`/testcases/${testCase.previous_test_case_id}`}
                  className="data-[visible=false]:invisible"
                >
                  <ChevronLeft
                    className="text-primary hover:text-secondary transition-colors"
                    size={60}
                  />
                </Link>

                <div className="mt-20">
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

                <Link
                  data-visible={!!testCase.next_test_case_id}
                  href={`/testcases/${testCase.next_test_case_id}`}
                  className="data-[visible=false]:invisible"
                >
                  <ChevronRight
                    className="text-primary hover:text-secondary transition-colors"
                    size={60}
                  />
                </Link>
              </div>

              <div className="mt-10 flex items-center gap-4">
                <p className="text-xl font-semibold">Alterar status:</p>
                <Select
                  value={statusSelected}
                  onValueChange={setStatusSelected}
                >
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
            </div>
          ) : (
            <NotFound />
          )}
        </>
      )}
    </>
  )
}
