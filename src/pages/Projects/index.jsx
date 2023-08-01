import { Navbar } from '../../components'
import { Information } from './styles'

export default function Projects() {
    return (
        <div>
            <Navbar activeItem='projects' />
            <Information>
                Aqui serão exibidos detalhes dos projetos vinculados ao usuário.
            </Information>
        </div>
    )
}