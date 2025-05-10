'use client'

import { ReactNode, useState } from 'react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogTrigger,
  Button,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Input,
  DialogFooter,
  Textarea
} from '@/components'
import { TestCase } from '@/api'

export interface OnSaveTestCaseProps {
  title: string
  summary: string
  preconditions: string
  id?: number
}

interface ModalSaveTestCaseProps {
  children: ReactNode
  onSaveTestCase: (props: OnSaveTestCaseProps) => Promise<void>
  testCase?: TestCase
}

export function ModalSaveTestCase({
  children,
  onSaveTestCase,
  testCase
}: ModalSaveTestCaseProps) {
  const [testCaseTitle, setTestCaseTitle] = useState(testCase?.title || '')
  const [testCaseSummary, setTestCaseSummary] = useState(testCase?.summary || '')
  const [testCasePreconditions, setTestCasePreconditions] = useState(
    testCase?.preconditions || ''
  )

  const isUpdate = testCase !== undefined

  function hasRequiredEmptyField() {
    return testCaseTitle.trim() === '' || testCaseSummary.trim() === ''
  }

  function clearFields() {
    setTestCaseTitle('')
    setTestCaseSummary('')
    setTestCasePreconditions('')
  }

  function closeModal() {
    document.getElementById('close-modal-new-testcase')!.click()
  }

  function handleSubmit() {
    if (hasRequiredEmptyField()) {
      return toast.error('Preencha todos os campos')
    }

    onSaveTestCase({
      id: testCase?.id,
      title: testCaseTitle.trim(),
      summary: testCaseSummary.trim(),
      preconditions: testCasePreconditions.trim()
    }).then(() => {
      closeModal()
      if (!isUpdate) clearFields()
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Caso de testes</DialogTitle>
          <DialogDescription>Cadastro de um novo caso de testes</DialogDescription>
          <DialogClose id="close-modal-new-testcase" />
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="testcase-name" className="text-right">
              Título*
            </label>
            <Input
              id="testcase-name"
              className="col-span-3"
              placeholder="Título do caso de testes"
              value={testCaseTitle}
              onChange={(e) => setTestCaseTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="testcase-description" className="text-right">
              Descrição*
            </label>
            <Textarea
              id="testcase-description"
              placeholder="Passos a serem executados no teste"
              className="col-span-3 resize-none"
              value={testCaseSummary}
              onChange={(e) => setTestCaseSummary(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="testcase-preconditions" className="text-right">
              Pré-condições
            </label>
            <Textarea
              id="testcase-preconditions"
              placeholder="Pré-condições para a execução do teste"
              className="col-span-3 resize-none"
              value={testCasePreconditions}
              onChange={(e) => setTestCasePreconditions(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            className="hover:bg-secondary"
            onClick={handleSubmit}
            disabled={hasRequiredEmptyField()}
          >
            {isUpdate ? 'Atualizar' : 'Cadastrar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
