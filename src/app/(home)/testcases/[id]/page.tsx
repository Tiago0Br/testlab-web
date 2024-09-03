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
  Loading,
  NotFound,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface TestCasesPageProps {
  params: {
    id: string
  }
}

export default function TestCases({ params: { id } }: TestCasesPageProps) {
  const [testCase, setTestCase] = useState<TestCaseDetails | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    getSessionToken().then((token) => {
      setIsLoading(true)

      api
        .getTestCaseById(token, parseInt(id))
        .then((response) => {
          const currentTestCase = response.data as TestCaseDetails
          setTestCase(currentTestCase)
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
                  <Select>
                    <SelectTrigger className="w-60 bg-foreground">
                      <SelectValue placeholder="Selecione um projeto" />
                    </SelectTrigger>
                    <SelectContent className="bg-foreground">
                      <SelectItem
                        value={`passou`}
                        className="text-white hover:cursor-pointer hover:bg-gray-600"
                      >
                        Passou
                      </SelectItem>
                      <SelectItem
                        value={`falhou`}
                        className="text-white hover:cursor-pointer hover:bg-gray-600"
                      >
                        Com falha
                      </SelectItem>
                      <SelectItem
                        value={`bloqueado`}
                        className="text-white hover:cursor-pointer hover:bg-gray-600"
                      >
                        Bloqueado
                      </SelectItem>
                      <SelectItem
                        value={`cancelado`}
                        className="text-white hover:cursor-pointer hover:bg-gray-600"
                      >
                        Cancelado
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
