import { useContext, useState } from 'react'
import logo from '../../assets/logo.png'
import './styles.css'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/Auth/AuthContext'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Loading } from '../../components'

const swalAlert = withReactContent(Swal)

export default function Login() {
    const auth = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        if (email && password) {
            setLoading(true)
            const { isLogged, error } = await auth.signIn(email, password)
            setLoading(false)
            if (isLogged) {
                navigate('/')
            }
            else {
                swalAlert.fire({
                    icon: 'error',
                    title: error.response.data.error,
                    showConfirmButton: true,
                    timer: 1000
                })
            }
        } else {
            swalAlert.fire({
                icon: 'error',
                title: 'Preencha o e-mail e a senha!',
                showConfirmButton: true,
                timer: 1000
            })
        }
    }

    return (
        <div className="container">
            { loading && <Loading /> }

            <div className="form-container">
                <div className="wrap-form">
                    <form className="form" onSubmit={handleLogin}>
                        <span className="form-title">
                            <img src={logo} alt="Logo do TestLab" />
                        </span>
                        <span className="form-title text">Bora testar!</span>
                        <div className="wrap-input">
                            <input
                                className={email !== '' ? 'has-val input' : 'input'}
                                type="email"
                                name="email"
                                id="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <span className="focus-input" data-placeholder="E-mail"></span>
                        </div>
                        <div className="wrap-input">
                            <input
                                className={password !== '' ? 'has-val input' : 'input'}
                                type="password"
                                name="password"
                                id="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <span className="focus-input" data-placeholder="Senha"></span>
                        </div>

                        <div className="container-form-btn">
                            <button className="form-btn">Login</button>
                        </div>

                        <div className="text-center">
                            <span className="txt1">Não possui conta?</span>

                            <Link to='/register' className="txt2">Criar conta.</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}