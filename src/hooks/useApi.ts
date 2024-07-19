import { api } from '@/lib/axios'
import { AxiosResponse } from 'axios'

interface useApiProps {
  login: (email: string, password: string) => Promise<AxiosResponse>
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<AxiosResponse>
  recoverUserInfo: (token: string) => Promise<AxiosResponse>
  getUserProjects: (token: string) => Promise<AxiosResponse>
  getProjectContent: (
    token: string,
    projectId: number,
    folderId?: number
  ) => Promise<AxiosResponse>
  createNewProject: (
    token: string,
    name: string,
    description: string
  ) => Promise<AxiosResponse>
  createNewFolder: ({
    token,
    project_id,
    title,
    folder_id
  } : {
    token: string
    project_id: number
    title: string,
    folder_id?: number
  }) => Promise<AxiosResponse>
  deleteTestCase: (token: string, testCaseId: number) => Promise<AxiosResponse>
}

export const useApi = (): useApiProps => ({
  login: (email: string, password: string) => {
    return api.post('/login', { email, password })
  },
  register: (name: string, email: string, password: string) => {
    return api.post('/users/new', { name, email, password })
  },
  recoverUserInfo: (token: string) => {
    return api.get('/users/info', {
      headers: {
        Authorization: token,
      },
    })
  },
  getUserProjects: (token: string) => {
    return api.get('/users/projects', {
      headers: {
        Authorization: token,
      },
    })
  },

  getProjectContent(token, projectId, folderId) {
    return api.get(
      `/projects/${projectId}/folders${
        folderId ? `?folder_id=${folderId}` : ''
      }`,
      {
        headers: {
          Authorization: token,
        },
      }
    )
  },

  createNewProject(token, name, description) {
    return api.post(
      '/projects/new',
      { name, description },
      {
        headers: {
          Authorization: token,
        },
      }
    )
  },

  deleteTestCase(token, testCaseId) {
    return api.delete(`/test_cases/${testCaseId}`, {
      headers: {
        Authorization: token,
      },
    })
  },

  createNewFolder({ token, project_id, title, folder_id }) {
    return api.post(
      `/folders/new`,
      {
        title,
        folder_id: folder_id ?? null,
        project_id,
        is_test_suite: 1
      },
      {
        headers: {
          Authorization: token,
        },
      }
    )
  },
})
