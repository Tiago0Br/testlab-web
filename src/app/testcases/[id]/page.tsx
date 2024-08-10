import { TestCaseWithAllStatus } from '@/utils/types'
import { Header } from '@/components'
import { getStatusColor } from '@/utils/testCasesStatusColor'
import NotFound from '@/app/not-found'
import { getSessionToken } from '@/services/authService'
import { apiService as api } from '@/services/apiService'

interface TestCasesPageProps {
  params: {
    id: string
  }
}

export default async function TestCases({
  params: { id },
}: TestCasesPageProps) {
  const token = await getSessionToken()
  let testCase = null

  try {
    const response = await api.getTestCaseById(token, parseInt(id))
    testCase = response.data as TestCaseWithAllStatus
  } catch (error) {
    console.log(error)
  }

  return (
    <>
      <Header />
      {testCase ? (
        <div className="flex flex-col items-center pb-6 pt-20">
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
