import { api } from "@/lib/axios"

export const useApi = () => ({
  login: (email: string, password: string) => {
    return api.post('/login', { email, password })
  },
  register: (name: string, email: string, password: string) => {
    return api.post('/users', { name, email, password })
  }
})
