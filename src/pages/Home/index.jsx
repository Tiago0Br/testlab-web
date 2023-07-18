import { useContext } from "react"
import { AuthContext } from "../../contexts/Auth/AuthContext"

export default function Home() {
    const auth = useContext(AuthContext)

    return (
        <div>
            <h2>Em progresso...</h2>
            <p>Seja bem-vindo, {auth.user.name}!</p>
        </div>
    )
}