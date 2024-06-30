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
  getProjectFolders: (
    token: string,
    projectId: number
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

  getProjectFolders(token, projectId) {
    return api.get(`/projects/${projectId}/folders`, {
      headers: {
        Authorization: token,
      },
    })
  },
})
