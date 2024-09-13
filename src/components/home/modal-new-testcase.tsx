'use client'

import { ReactNode, useState } from 'react'
import {
  Dialog,
  DialogTrigger,
  Button,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Input,
  DialogFooter,
  Loading,
  Textarea,
} from '@/components'
import { toast } from 'sonner'
import { Folder } from '@/utils/types'
import { getSessionToken } from '@/services/auth-service'
import { createTestCase } from '@/api'

interface ModalNewTestCaseProps {
  currentFolder: Folder
  children: ReactNode
}

export function ModalNewTestCase({
  currentFolder,
  children,
}: ModalNewTestCaseProps) {
  const [testCaseTitle, setTestCaseTitle] = useState('')
  const [testCaseSummary, setTestCaseSummary] = useState('')
  const [testCasePreconditions, setTestCasePreconditions] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  function hasRequiredEmptyField() {
    return testCaseTitle.trim() === '' || testCaseSummary.trim() === ''
  }

  function clearFields() {
    setTestCaseTitle('')
    setTestCaseSummary('')
    setTestCasePreconditions('')
  }

  function handleSubmit() {
    if (hasRequiredEmptyField()) {
      return toast.error('Preencha todos os campos')
    }

    setIsLoading(true)

    getSessionToken().then((token) => {
      createTestCase({
        token,
        title: testCaseTitle.trim(),
        summary: testCaseSummary.trim(),
        preconditions: testCasePreconditions.trim()
          ? testCasePreconditions.trim()
          : undefined,
        test_suite_id: currentFolder.id,
      }).then(({ error }) => {
        setIsLoading(false)
        if (error) {
          toast.error(error)
          return
        }

        clearFields()
        toast.success('Caso de testes criado com sucesso!')
      })
    })
  }

  return (
    <>
      <Loading isLoading={isLoading} />
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Caso de testes</DialogTitle>
            <DialogDescription>
              Cadastro de um novo caso de testes
            </DialogDescription>
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
              Cadastrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
