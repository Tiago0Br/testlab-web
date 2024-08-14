import { api } from '@/lib/axios'
import { AxiosResponse } from 'axios'

export interface ApiProps {
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
    projectId: number
  ) => Promise<AxiosResponse>
  getFolderContent: (token: string, folderId: number) => Promise<AxiosResponse>
  createNewProject: (
    token: string,
    name: string,
    description: string
  ) => Promise<AxiosResponse>
  createNewFolder: ({
    token,
    project_id,
    title,
    folder_id,
  }: {
    token: string
    project_id: number
    title: string
    folder_id?: number
  }) => Promise<AxiosResponse>
  getFolderById: (token: string, folderId: number) => Promise<AxiosResponse>
  createTestCase: ({
    token,
    title,
    test_suite_id,
  }: {
    token: string
    title: string
    summary: string
    preconditions?: string
    test_suite_id: number
  }) => Promise<AxiosResponse>
  deleteTestCase: (token: string, testCaseId: number) => Promise<AxiosResponse>
  getTestCaseById: (token: string, testCaseId: number) => Promise<AxiosResponse>
}

export const apiService: ApiProps = {
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

  getProjectContent(token, projectId) {
    return api.get(`/projects/${projectId}/content`, {
      headers: {
        Authorization: token,
      },
    })
  },

  getFolderContent(token, folderId) {
    return api.get(`/folders/${folderId}/content`, {
      headers: {
        Authorization: token,
      },
    })
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
        is_test_suite: 1,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    )
  },

  getFolderById(token, folderId) {
    return api.get(`/folders/${folderId}`, {
      headers: {
        Authorization: token,
      },
    })
  },

  createTestCase({ token, title, summary, preconditions, test_suite_id }) {
    return api.post(
      `/test_cases/new`,
      {
        title,
        summary,
        preconditions,
        test_suite_id,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    )
  },

  getTestCaseById(token, testCaseId) {
    return api.get(`/test_cases/${testCaseId}`, {
      headers: {
        Authorization: token,
      },
    })
  },
}
