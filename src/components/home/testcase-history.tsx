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
    <Accordion type="single" collapsible className="w-[600px]">
      <AccordionItem value="history">
        <AccordionTrigger>Histórico de alterações</AccordionTrigger>
        <AccordionContent className="max-h-[500px] overflow-y-scroll overflow-x-hidden">
          <Table className="bg-foreground rounded-lg mt-6 w-[600px]">
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Data/Hora</TableHead>
                <TableHead>Autor</TableHead>
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
                  <TableCell>{status.created_by ?? ''}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
