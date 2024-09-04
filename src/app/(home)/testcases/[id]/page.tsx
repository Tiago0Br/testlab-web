'use client'

import { TestCaseDetails } from '@/utils/types'
import { getStatusColor } from '@/utils/testCasesStatusColor'
import { getSessionToken } from '@/services/authService'
import { apiService as api } from '@/services/apiService'
import { useEffect, useState } from 'react'
import { isAxiosError } from 'axios'
import { StepBack, StepForward } from 'lucide-react'
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

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {testCase ? (
            <div className="flex justify-center items-center pb-6 pt-6">
              <Link
                data-visible={
                  typeof testCase.previous_test_case_id === 'number'
                }
                href={`/testcases/${testCase.previous_test_case_id}`}
                className="mr-20 data-[visible=false]:invisible"
              >
                <StepBack
                  className="text-primary transition-colors hover:fill-primary"
                  size={60}
                />
              </Link>

              <div className="flex flex-col items-center">
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

                <div className="mt-10 flex items-center gap-4">
                  <p className="text-xl font-semibold">Alterar status:</p>
                  <Select onValueChange={setStatusSelected}>
                    <SelectTrigger className="w-60 bg-foreground">
                      <SelectValue placeholder="Selecione um status" />
                    </SelectTrigger>
                    <SelectContent className="bg-foreground">
                      {statusOptions.map((status) => (
                        <>
                          {!status.disabled && (
                            <SelectItem
                              key={`status-${status.value}`}
                              value={status.value}
                              className="text-white hover:cursor-pointer hover:bg-gray-600"
                            >
                              {status.label}
                            </SelectItem>
                          )}
                        </>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {statusSelected && (
                  <div className="w-full flex flex-col mt-6 gap-4">
                    <Textarea placeholder="Observações" />
                    <Button>Atualizar</Button>
                  </div>
                )}
              </div>

              <Link
                data-visible={typeof testCase.next_test_case_id === 'number'}
                href={`/testcases/${testCase.next_test_case_id}`}
                className="ml-20 data-[visible=false]:invisible"
              >
                <StepForward
                  className="text-primary transition-colors hover:fill-primary"
                  size={60}
                />
              </Link>
            </div>
          ) : (
            <NotFound />
          )}
        </>
      )}
    </>
  )
}
