import { useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/Auth/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
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
            <Link to='/'>
                <Img src={logo} alt="Logo do sistema" />
            </Link>

            <div>
                <NavbarList>
                    <Item><ItemText name='home' to='/'>Início</ItemText></Item>
                    <Item><ItemText name='projects' to='/projects'>Projetos</ItemText></Item>
                    <Item><ItemText name='profile' to='/profile'>Perfil</ItemText></Item>
                    <Item><ItemText onClick={handleLogout}>Sair</ItemText></Item>
                </NavbarList>
            </div>
        </Nav>
    )
}