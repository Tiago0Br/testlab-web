import { TestCaseStatus } from '@/api'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '..'

interface TestCaseHistoryProps {
  history: TestCaseStatus[]
}

export function TestCaseHistory({ history }: TestCaseHistoryProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="history">
        <AccordionTrigger>Histórico de alterações</AccordionTrigger>
        <AccordionContent>
          <Table className="bg-foreground rounded-lg mt-6 min-w-[300px]">
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Data/Hora</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((status) => (
                <TableRow key={status.id}>
                  <TableCell className="max-w-[400px]">
                    {status.description}
                  </TableCell>
                  <TableCell>
                    {new Date(status.created_at)
                      .toLocaleString()
                      .replace(',', ' ')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
