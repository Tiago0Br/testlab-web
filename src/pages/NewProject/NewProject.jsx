import { useContext, useState } from 'react'
import { Loading, Navbar } from '../../components'
import { useApi } from '../../hooks/useApi'
import { AuthContext } from '../../contexts/Auth/AuthContext'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const swalAlert = withReactContent(Swal)

export const NewProject = () => {
    const api = useApi()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const auth = useContext(AuthContext)

    const handleSubmit = async e => {
        e.preventDefault()

        if (!name || name === '') {
            swalAlert.fire({
                icon: 'error',
                title: 'Preencha o nome do projeto!',
                showConfirmButton: true,
                timer: 1000
            })

            return;
        }

        setIsLoading(true)
        const res = await api.createProject({ 
            name, 
            description, 
            ownerUserId: auth.user.id
        })

        setName('')
        setDescription('')
        setIsLoading(false)

        if (res.project) {
            swalAlert.fire({
                icon: 'success',
                title: 'Projeto cadastrado com sucesso!',
                showConfirmButton: true,
                timer: 1000
            })
        } else {
            swalAlert.fire({
                icon: 'error',
                title: 'Não foi possível cadastrar o projeto.',
                showConfirmButton: true,
                timer: 1000
            })
        }
    }

    return (
        <div>
            { isLoading && <Loading /> }
            <Navbar activeItem='projects' />
            <div className="form-container">
                <div className="wrap-form">
                    <form className="form" onSubmit={handleSubmit}>
                        <span className="form-title text">Novo projeto</span>
                        <div className="wrap-input">
                            <input
                                className={name !== '' ? 'has-val input' : 'input'}
                                type="text"
                                name="name"
                                id="name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                            <span className="focus-input" data-placeholder="Nome *"></span>
                        </div>
                        <div className="wrap-input">
                            <textarea
                                className={description !== '' ? 'has-val input' : 'input'}
                                type="description"
                                name="description"
                                id="description"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                            <span className="focus-input" data-placeholder="Descrição"></span>
                        </div>

                        <div className="container-form-btn">
                            <button className="form-btn text">Cadastrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}