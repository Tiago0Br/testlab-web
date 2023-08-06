import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL
const api = axios.create({
    baseURL
})

const userToken = localStorage.getItem('authToken')

export const useApi = () => ({
    signIn: async (email, password) => {
        try {
            const response = await api.post('/login', { email, password })
            return response.data
        } catch (error) {
            return error
        }
    },

    register: async ({ name, email, password }) => {
        try {
            const response = await api.post('/users', { name, email, password })
            return response.data
        } catch (error) {
            return error
        }
    },

    createProject: async ({ name, description, ownerUserId }) => {
        try {
            const response = await api.post('/projects', { name, description, ownerUserId }, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
            return response.data
        } catch (error) {
            return error
        }
    },

    getUsersProjects: async (userId) => {
        try {
            const response = await api.get(`/users/${userId}/projects`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
            return response.data
        } catch (error) {
            return error
        }
    }
})