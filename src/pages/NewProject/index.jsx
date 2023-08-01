import { Navbar } from '../../components'
import { Title } from './styles'

export default function NewProject() {
    return (
        <div>
            <Navbar activeItem='projects' />
            <Title>Cadastro de projeto</Title>
        </div>
    )
}