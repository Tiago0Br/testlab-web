import { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { useApi } from '../../hooks/useApi'

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(null)
    const api = useApi()
    
    useEffect(() => {
        const verifyToken = () => {
            const storageToken = localStorage.getItem('authToken')
            const storageUser = localStorage.getItem('user')
            if (storageToken && storageUser) {
                setUser(JSON.parse(storageUser))
            }
        }
        verifyToken()
    }, [])

    const signIn = async (email, password) => {
        const response = await api.signIn(email, password)
        if (response.user && response.token) {
            setUser(response.user)
            storageData(response.user, response.token)
            return {
                isLogged: true,
                user: response.user
            }
        }
        return {
            isLogged: false,
            error: response
        }
    }
    const signOut = () => {
        setUser(null)
        localStorage.clear()
    }

    const storageData = (user, token) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('authToken', token)
    }

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}