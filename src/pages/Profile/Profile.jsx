import { Navbar } from '../../components'
import { Information } from './styles'

export const Profile = () => {
    return (
        <div>
            <Navbar activeItem='profile' />
            <Information>
                Aqui serão exibidos os dados do usuário logado.
            </Information>
        </div>
    )
}