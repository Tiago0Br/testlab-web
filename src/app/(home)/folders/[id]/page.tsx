'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { FolderIcon, CircleCheckBig } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { getFolderById, getFolderContent, createFolder, saveTestCase } from '@/api'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Folder as FolderComponent,
  Loading,
  ModalNewFolder,
  TestCases,
  NotFound,
  ModalSaveTestCase,
  OnSaveTestCaseProps
} from '@/components'

interface FoldersPageProps {
  params: {
    id: string
  }
}

export default function Folders({ params: { id } }: FoldersPageProps) {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { data: folderResponse, isLoading: isFolderLoading } = useQuery({
    queryKey: ['get-folder'],
    queryFn: () => getFolderById(parseInt(id))
  })

  const { data: contentResponse, isLoading: isContentLoading } = useQuery({
    queryKey: ['get-folder-content', id],
    queryFn: () => getFolderContent(parseInt(id))
  })

  const currentFolder = folderResponse?.data
  const parentFolder = currentFolder?.parent_folder
  const content = contentResponse?.data

  const hasAnyFolder = content && content.folders.length > 0
  const hasAnyTestCase = content && content.test_cases.length > 0

  async function onCreateFolder(folderName: string) {
    createFolder({
      title: folderName,
      folder_id: currentFolder!.id,
      project_id: currentFolder!.project.id
    }).then(({ error, data }) => {
      if (error || !data) {
        toast.error(error)
        return
      }

      queryClient.invalidateQueries({ queryKey: ['get-folder-content', id] })
      toast.success('Pasta criada com sucesso!')
    })
  }

  async function onCreateTestCase({ title, summary, preconditions }: OnSaveTestCaseProps) {
    const { error } = await saveTestCase({
      title,
      summary,
      preconditions: preconditions !== '' ? preconditions : undefined,
      test_suite_id: currentFolder!.id
    })

    if (error) {
      toast.error(error)
      return
    }

    queryClient.invalidateQueries({ queryKey: ['get-folder-content', id] })
    toast.success('Caso de testes criado com sucesso!')
  }

  if (isFolderLoading || isContentLoading) {
    return <Loading />
  }

  if (!currentFolder) {
    return <NotFound />
  }

  return (
    <div className="flex flex-col items-center py-6">
      <input type="hidden" id="folder-id" value={currentFolder.id} />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbItem
              className="text-white hover:text-primary hover:cursor-pointer"
              onClick={() => router.push('/')}
            >
              Início
            </BreadcrumbItem>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {parentFolder && (
            <>
              <BreadcrumbItem className="text-white">...</BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbItem
                  className="text-white hover:text-primary hover:cursor-pointer"
                  onClick={() => router.push(`/folders/${parentFolder.id}`)}
                >
                  {parentFolder.title}
                </BreadcrumbItem>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          )}
          <BreadcrumbItem>
            <BreadcrumbPage className="text-primary">{currentFolder.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {!hasAnyFolder && !hasAnyTestCase ? (
        <div className="flex flex-col items-center">
          <Image src="/no-content.png" alt="empty folder" width={300} height={300} />
          <h1>Sem conteúdo D:</h1>
          <div className="mt-4 flex gap-2">
            <ModalNewFolder onCreateFolder={onCreateFolder}>
              <Button
                className="
                  flex gap-2 w-44 border border-primary text-primary bg-transparent uppercase font-bold 
                  hover:bg-primary hover:text-white
                "
              >
                <FolderIcon size={24} />
                Nova Pasta
              </Button>
            </ModalNewFolder>

            <ModalSaveTestCase onSaveTestCase={onCreateTestCase}>
              <Button
                className="
                  flex gap-2 w-44 border border-primary text-primary bg-transparent uppercase font-bold 
                  hover:bg-primary hover:text-white
                "
              >
                <CircleCheckBig size={24} />
                Novo Teste
              </Button>
            </ModalSaveTestCase>
          </div>
        </div>
      ) : (
        <div className="mt-4 flex gap-2">
          <ModalNewFolder onCreateFolder={onCreateFolder}>
            <Button
              className="
                flex gap-2 w-44 border border-primary text-primary bg-transparent uppercase font-bold 
                hover:bg-primary hover:text-white
              "
            >
              <FolderIcon size={24} />
              Nova Pasta
            </Button>
          </ModalNewFolder>

          <ModalSaveTestCase onSaveTestCase={onCreateTestCase}>
            <Button
              className="
                flex gap-2 w-44 border border-primary text-primary bg-transparent uppercase font-bold 
                hover:bg-primary hover:text-white
              "
            >
              <CircleCheckBig size={24} />
              Novo Teste
            </Button>
          </ModalSaveTestCase>
        </div>
      )}

      {hasAnyFolder && (
        <div className="w-full mt-6 flex flex-col items-center gap-4">
          <h1 className="font-semibold text-lg">Pastas</h1>
          <div className="w-full px-10 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {content?.folders.map((folder) => (
              <FolderComponent
                key={folder.id}
                folder={folder}
                onFolderSelect={() => router.push(`/folders/${folder.id}`)}
              />
            ))}
          </div>
        </div>
      )}

      {hasAnyTestCase && (
        <div className="mt-6">
          <h1 className="font-semibold text-lg text-center">Casos de testes</h1>
          <TestCases testCases={content.test_cases} />
        </div>
      )}
    </div>
  )
}
