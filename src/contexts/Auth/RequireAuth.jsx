import { useContext } from "react"
import { AuthContext } from "./AuthContext"
import Login from "../../pages/Login"

// eslint-disable-next-line react/prop-types
export const RequireAuth = ({ children }) => {
    const auth = useContext(AuthContext)

    if (!auth.user) {
        return <Login />
    }

    return children
}