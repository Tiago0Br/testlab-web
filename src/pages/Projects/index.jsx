import Navbar from '../../components/Navbar'
import { Information } from './styles'

export default function Projects() {
    return (
        <div>
            <Navbar activeItem='projects' />
            <Information>
                Aqui serão exibidos os dados do usuário logado.
            </Information>
        </div>
    )
}