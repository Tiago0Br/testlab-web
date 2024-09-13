'use client'

import {
  Folder,
  getFolderById,
  FolderContent,
  getFolderContent,
  ParentFolder,
} from '@/api'
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
  ModalNewTestCase,
} from '@/components'
import { getSessionToken } from '@/services/auth-service'
import { FolderIcon, CircleCheckBig } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
interface FoldersPageProps {
  params: {
    id: string
  }
}

export default function Folders({ params: { id } }: FoldersPageProps) {
  const [currentFolder, setCurrentFolder] = useState<Folder | null>(null)
  const [parentFolder, setParentFolder] = useState<ParentFolder | null>(null)
  const [content, setContent] = useState<FolderContent | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const hasContent = content !== null
  const hasAnyFolder = hasContent && content.folders.length > 0
  const hasAnyTestCase = hasContent && content.test_cases.length > 0

  useEffect(() => {
    setIsLoading(true)

    getSessionToken().then((token) => {
      getFolderById(token, parseInt(id)).then(({ data, error }) => {
        if (error) {
          setIsLoading(false)
          toast.error(error)
          return
        }

        setCurrentFolder(data!)
        setParentFolder(data?.parent_folder ?? null)

        getFolderContent(token, data!.id).then(({ data, error }) => {
          setIsLoading(false)
          if (error) {
            toast.error(error)
            return
          }

          setContent(data!)
        })
      })
    })
  }, [id])

  return (
    <>
      {isLoading ? (
        <Loading isLoading={isLoading} />
      ) : (
        <>
          {currentFolder ? (
            <div className="flex flex-col items-center">
              <Breadcrumb className="mt-6">
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
                      <BreadcrumbItem className="text-white">
                        ...
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbItem
                          className="text-white hover:text-primary hover:cursor-pointer"
                          onClick={() =>
                            router.push(`/folders/${parentFolder.id}`)
                          }
                        >
                          {parentFolder.title}
                        </BreadcrumbItem>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                    </>
                  )}
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-primary">
                      {currentFolder.title}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              {!hasAnyFolder && !hasAnyTestCase ? (
                <div className="flex flex-col items-center">
                  <Image
                    src="/no-content.png"
                    alt="empty folder"
                    width={300}
                    height={300}
                  />
                  <h1>Sem conteúdo D:</h1>
                  <div className="mt-4 flex gap-2">
                    <ModalNewFolder
                      currentProject={currentFolder.project!}
                      currentFolder={currentFolder}
                    >
                      <Button
                        className="w-44 border border-primary text-primary bg-transparent uppercase font-bold 
                          hover:bg-primary hover:text-white flex gap-2"
                      >
                        <FolderIcon size={24} />
                        Nova Pasta
                      </Button>
                    </ModalNewFolder>

                    <ModalNewTestCase currentFolder={currentFolder}>
                      <Button
                        className="w-44 border border-primary text-primary bg-transparent uppercase font-bold 
                          hover:bg-primary hover:text-white flex gap-2"
                      >
                        <CircleCheckBig size={24} />
                        Novo Teste
                      </Button>
                    </ModalNewTestCase>
                  </div>
                </div>
              ) : (
                <div className="mt-4 flex gap-2">
                  <ModalNewFolder
                    currentProject={currentFolder.project!}
                    currentFolder={currentFolder}
                  >
                    <Button
                      className="w-44 border border-primary text-primary bg-transparent uppercase font-bold 
                          hover:bg-primary hover:text-white flex gap-2"
                    >
                      <FolderIcon size={24} />
                      Nova Pasta
                    </Button>
                  </ModalNewFolder>

                  <ModalNewTestCase currentFolder={currentFolder}>
                    <Button
                      className="w-44 border border-primary text-primary bg-transparent uppercase font-bold 
                          hover:bg-primary hover:text-white flex gap-2"
                    >
                      <CircleCheckBig size={24} />
                      Novo Teste
                    </Button>
                  </ModalNewTestCase>
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
                        onFolderSelect={() =>
                          router.push(`/folders/${folder.id}`)
                        }
                      />
                    ))}
                  </div>
                </div>
              )}

              {hasAnyTestCase && (
                <div className="mt-6">
                  <h1 className="font-semibold text-lg text-center">
                    Casos de testes
                  </h1>
                  <TestCases testCases={content.test_cases} />
                </div>
              )}
            </div>
          ) : (
            <NotFound />
          )}
        </>
      )}
    </>
  )
}
