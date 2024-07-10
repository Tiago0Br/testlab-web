import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components'
import { TestCase, TestCaseStatus } from '@/types'
import { Eye, Pencil, Trash2 } from 'lucide-react'

interface TestCasesProps {
  testCases: TestCase[]
}

export function TestCases({ testCases }: TestCasesProps) {
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
              <button className="p-1 bg-blue-500 rounded-md hover:bg-blue-400">
                <Eye size={24} className="text-white" />
              </button>
              <button className="p-1 bg-orange-400 rounded-md hover:bg-orange-300">
                <Pencil size={24} className="text-white" />
              </button>
              <button className="p-1 bg-red-500 rounded-md hover:bg-red-400">
                <Trash2 size={24} className="text-white" />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
