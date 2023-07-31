import Navbar from '../../components/Navbar'
import { Information } from './styles'

export default function Profile() {
    return (
        <div>
            <Navbar activeItem='profile' />
            <Information>
                Aqui serão exibidos detalhes dos projetos vinculados ao usuário.
            </Information>
        </div>
    )
}