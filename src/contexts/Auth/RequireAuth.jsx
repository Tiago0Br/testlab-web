import { useContext } from "react"
import { AuthContext } from "./AuthContext"
import { useNavigate } from "react-router-dom"
import Login from "../../pages/Login"

// eslint-disable-next-line react/prop-types
export const RequireAuth = ({ children }) => {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    if (!auth.user) {
        navigate('/login')
        return <Login />
    }

    return children
}