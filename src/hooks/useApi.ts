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
}

export const useApi = (): useApiProps => ({
  login: (email: string, password: string) => {
    return api.post('/login', { email, password })
  },
  register: (name: string, email: string, password: string) => {
    return api.post('/users', { name, email, password })
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
})
