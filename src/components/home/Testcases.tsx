import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components'
import { TestCase } from '@/types'
import { CircleCheckBig, Pencil, Trash2 } from 'lucide-react'

interface TestCasesProps {
  testCases: TestCase[]
}

export function Testcases({ testCases }: TestCasesProps) {
  return (
    <Table className="bg-foreground rounded-lg mt-6">
      <TableHeader>
        <TableRow>
          <TableHead>Título</TableHead>
          <TableHead>Resumo</TableHead>
          <TableHead>Pré-condições</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {testCases.map((testCase) => (
          <TableRow key={testCase.id}>
            <TableCell>{testCase.title}</TableCell>
            <TableCell>{testCase.summary}</TableCell>
            <TableCell>{testCase.preconditions}</TableCell>
            <TableCell className="flex items-center justify-center gap-1">
              <button>
                <CircleCheckBig size={24} className="text-primary" />
              </button>
              <button>
                <Pencil size={24} className="text-yellow-500" />
              </button>
              <button>
                <Trash2 size={24} className="text-red-500" />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
