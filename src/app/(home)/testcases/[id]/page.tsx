import { TestCaseDetails } from '@/utils/types'
import {
  NotFound,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components'
import { getStatusColor } from '@/utils/testCasesStatusColor'
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
  let nextTestCase = null

  try {
    const response = await api.getTestCaseById(token, parseInt(id))
    testCase = response.data as TestCaseDetails
    nextTestCase = testCase.next_test_case
  } catch (error) {
    console.log(error)
  }

  return (
    <>
      {testCase ? (
        <div className="flex flex-col items-center pb-6 pt-20">
          <div>
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
      ) : (
        <NotFound />
      )}
    </>
  )
}
