import Navbar from '../../components/Navbar'
import { Information } from './styles'

export default function Profile() {
    return (
        <div>
            <Navbar activeItem='profile' />
            <Information>
                Aqui serão exibidos os dados do usuário logado.
            </Information>
        </div>
    )
}