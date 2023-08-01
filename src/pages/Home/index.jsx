import { useNavigate } from 'react-router-dom'
import { Navbar, Dropdown, ButtonNew } from '../../components'
import { Container } from './styles'

export default function Home() {
    const navigate = useNavigate()

    const handleNewProject = () => {
        navigate('/project/new')
    }

    return (
        <div>
            <Navbar />
            <Container>
                <Dropdown options={[]} />
                <ButtonNew onClickFn={handleNewProject} />
            </Container>
        </div>
    )
}