import { useNavigate } from 'react-router-dom'
import { Navbar, Dropdown, ButtonNew, Loading } from '../../components'
import { useApi } from '../../hooks/useApi'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/Auth/AuthContext'
import { Container } from './styles'

export default function Home() {
    const api = useApi()
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(false)

    const handleNewProject = () => {
        navigate('/project/new')
    }

    const onProjectChange = (options, projectName) => {
        const project = options.find(currentProject => projectName === currentProject.name)
        window.localStorage.setItem('currentProject', JSON.stringify(project))
    }

    const getCurrentProject = () => {
        const project = window.localStorage.getItem('currentProject')
        if (!project) return null

        const projectName = JSON.parse(project).name
        return projectName
    }

    useEffect(() => {
        const getProjects = () => {
            setLoading(true)
            api.getUsersProjects(auth.user.id).then(({ projects }) => {
                setProjects(projects)
            })
            setLoading(false)
        }

        getProjects()
    }, [])

    return (
        <div>
            { loading && <Loading /> }
            <Navbar />
            <Container>
                <Dropdown options={projects} currentOption={getCurrentProject()} onOptionChange={onProjectChange} />
                <ButtonNew onClickFn={handleNewProject} />
            </Container>
        </div>
    )
}