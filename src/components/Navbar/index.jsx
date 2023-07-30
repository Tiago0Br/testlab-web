import { useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/Auth/AuthContext'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/transparentLogo.png'
import { Nav, NavbarList, Img, Item, ItemText } from './styles'

// eslint-disable-next-line react/prop-types
export default function Navbar({ activeItem='home' }) {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()
    
    const handleLogout = () => {
        auth.signOut()
        navigate('/login')
    }

    useEffect(() => {
        const handleActiveItem = () => {
            document.querySelector('a.active')?.classList.remove('active')
            document.querySelector(`a[name=${activeItem}]`)?.classList.add('active')
        }

        handleActiveItem()
    }, [activeItem])

    return (
        <Nav>
            <a href='/'>
                <Img src={logo} alt="Logo do sistema" />
            </a>

            <div>
                <NavbarList>
                    <Item><ItemText name='home' href='/'>Início</ItemText></Item>
                    <Item><ItemText name='projects' href='/projects'>Projetos</ItemText></Item>
                    <Item><ItemText name='profile' href='/profile'>Perfil</ItemText></Item>
                    <Item><ItemText onClick={handleLogout}>Sair</ItemText></Item>
                </NavbarList>
            </div>
        </Nav>
    )
}