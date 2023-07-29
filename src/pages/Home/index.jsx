import { useContext } from "react"
import { AuthContext } from "../../contexts/Auth/AuthContext"

export default function Home() {
    const auth = useContext(AuthContext)

    return (
        <div className='container'>
            <div className='sub-container'>
                <p className='text'>Seja bem-vindo, {auth.user.name}!</p>
                <p className='text'>Tela em construção...</p>
            </div>
        </div>
    )
}