import { useState } from "react"
import { Link } from "react-router-dom"
import { useApi } from '../../hooks/useApi'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Loading } from "../../components"
import { showToast } from "../../utils"

const swalAlert = withReactContent(Swal)

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [loading, setLoading] = useState(false)
    const api = useApi()

    const handleRegister = async (e) => {
        e.preventDefault()
        if (email && password && passwordConfirm) {
            if (password === passwordConfirm) {
                const user = {
                    name,
                    email,
                    password
                }

                setLoading(true)
                const res = await api.register(user)
                setLoading(false)

                if (res.user) {
                    showToast('Cadastro criado com sucesso!')

                    clearFields()
                } else {
                    const errorMessage = res.response.data.error === 'O campo "email" não pode ser repetido.' ?
                        'Usuário já cadastrado!' :
                        'Não foi possível realizar seu cadastro!'
                    swalAlert.fire({
                        icon: 'error',
                        title: errorMessage,
                        showConfirmButton: true,
                        timer: 1000
                    })
                }
            } else {
                swalAlert.fire({
                    icon: 'error',
                    title: 'Senhas não conferem.',
                    showConfirmButton: true,
                    timer: 1000
                })
            }
            
        } else {
            swalAlert.fire({
                icon: 'error',
                title: 'Preencha todos os campos!',
                showConfirmButton: true,
                timer: 1000
            })
        }
    }

    const clearFields = () => {
        setName('')
        setEmail('')
        setPassword('')
        setPasswordConfirm('')
    }

    return (
        <div className="container">
            { loading && <Loading /> }
            <div className="form-container">
                <div className="wrap-form">
                    <form className="form" onSubmit={handleRegister}>
                        <span className="form-title text">Cadastre-se</span>
                        <div className="wrap-input">
                            <input
                                className={name !== '' ? 'has-val input' : 'input'}
                                type="text"
                                name="name"
                                id="name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                            <span className="focus-input" data-placeholder="Nome"></span>
                        </div>
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

                        <div className="wrap-input">
                            <input
                                className={passwordConfirm !== '' ? 'has-val input' : 'input'}
                                type="password"
                                name="passwordConfirm"
                                id="passwordConfirm"
                                value={passwordConfirm}
                                onChange={e => setPasswordConfirm(e.target.value)}
                            />
                            <span className="focus-input" data-placeholder="Confirmar senha"></span>
                        </div>

                        <div className="container-form-btn">
                            <button className="form-btn text">Cadastrar</button>
                        </div>

                        <div className="text-center">
                            <span className="txt1">Já possui conta?</span>

                            <Link to='/login' className="txt2">Login.</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}