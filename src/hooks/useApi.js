import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL
const api = axios.create({
    baseURL
})

export const useApi = () => ({
    signIn: async (email, password) => {
        try {
            const response = await api.post('/login', { email, password })
            return response.data
        } catch (error) {
            return error
        }
    },

    register: async ({name, email, password}) => {
        try {
            const response = await api.post('/users', { name, email, password })
            return response.data
        } catch (error) {
            return error
        }
    }
})