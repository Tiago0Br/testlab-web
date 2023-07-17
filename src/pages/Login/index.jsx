import { useState } from 'react'
import logo from '../../assets/logo.png'
import './styles.css'

export default function Login() {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    return (
        <div className="container">
            <div className="container-login">
                <div className="wrap-login">
                    <form method="POST" className="login-form">
                        <span className="login-form-title">
                            <img src={logo} alt="Logo do TestLab" />
                        </span>
                        <span className="login-form-title">Bora testar!</span>
                        <div className="wrap-input">
                            <input 
                                className={email !== '' ? 'has-val input': 'input'}
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
                                className={password !== '' ? 'has-val input': 'input'}
                                type="password" 
                                name="password" 
                                id="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <span className="focus-input" data-placeholder="Senha"></span>
                        </div>

                        <div className="container-login-form-btn">
                            <button className="login-form-btn">Login</button>
                        </div>

                        <div className="text-center">
                            <span className="txt1">Não possui conta?</span>

                            <a href="#" className="txt2">Criar conta.</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}