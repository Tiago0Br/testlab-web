import { useState } from "react"
import { AuthContext } from "./AuthContext"
import { useApi } from "../../hooks/useApi"

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(null)
    const api = useApi()

    const signIn = async (email, password) => {
        const response = await api.signIn(email, password)
        if (response.user && response.token) {
            setUser(response.user)
            setToken(response.token)
            return {
                isLogged: true
            }
        }
        return {
            isLogged: false,
            error: response
        }
    }
    const signOut = () => {
        setUser(null)
    }

    const setToken = (token) => {
        localStorage.setItem('token', token)
    }

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}