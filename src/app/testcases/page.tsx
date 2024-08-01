'use client'

import { TestCaseWithAllStatus } from '@/utils/types'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useApi } from '@/hooks/useApi'
import NotFound from '../not-found'
import { Header, Loading } from '@/components'
import { getStatusColor } from '@/utils/testCasesStatusColor'
import Head from 'next/head'

export default function TestCases({ token }: { token: string }) {
  const searchParams = useSearchParams()
  const [testCase, setTestCase] = useState<TestCaseWithAllStatus | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const api = useApi()

  useEffect(() => {
    function getTestCase() {
      setIsLoading(true)
      const testId = Number(searchParams.get('id'))

      api
        .getTestCaseById(token, testId)
        .then((response) => {
          const testCase = response.data as TestCaseWithAllStatus

          setTestCase(testCase)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => setIsLoading(false))
    }

    getTestCase()
  }, []) //eslint-disable-line

  return (
    <>
      <Head>
        <title>Testlab - Caso de teste</title>
      </Head>
      <Loading isLoading={isLoading} />
      <Header />
      {testCase ? (
        <div className="min-h-screen bg-background flex flex-col items-center pb-6 pt-20">
          <div>
            <div className="flex justify-center items-center gap-4">
              <h1 className="text-3xl font-semibold">{testCase.title}</h1>

              <div
                className={`py-1 px-2 rounded-md text-center font-semibold ${getStatusColor(
                  testCase.status[0].status
                )}`}
              >
                {testCase.status[0].status}
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-semibold">Sumário:</h3>
              <p>{testCase.summary}</p>
            </div>

            {testCase.preconditions && (
              <div>
                <h3>Precondições:</h3>
                <p>{testCase.preconditions}</p>
              </div>
            )}
          </div>

          <h3 className="mt-10 font-semibold text-xl">Em progresso...</h3>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  )
}
