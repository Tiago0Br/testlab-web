import { useNavigate } from 'react-router-dom'
import { Navbar, ButtonNew, Loading, Dropdown } from '../../components'
import { useApi } from '../../hooks/useApi'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/Auth/AuthContext'
import { Container, Information } from './styles'

export default function Home() {
    const api = useApi()
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const [projects, setProjects] = useState([])
    const [project, setProject] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleNewProject = () => {
        navigate('/project/new')
    }

    const onProjectChange = (projectName) => {
        const projectSelected = projects.find(currentProject => projectName === currentProject.name)
        setProject(projectSelected)
        window.localStorage.setItem('currentProject', JSON.stringify(projectSelected))
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
        const currentProject = window.localStorage.getItem('currentProject')
        if (currentProject) setProject(JSON.parse(currentProject))
    }, [])

    return (
        <div>
            { loading && <Loading /> }
            <Navbar activeItem='projects' />
            <Container>
                <Dropdown 
                    label='Projeto' 
                    options={projects} 
                    currentOption={getCurrentProject()} 
                    onOptionChange={onProjectChange} 
                />
                <ButtonNew onClickFn={handleNewProject} />
            </Container>
            <Information>
                { project ? (
                    <div>
                        <h1>{ project.name }</h1>
                        <p>{ project.description }</p>
                    </div>
                ) : (
                    <h1>Nenhum projeto selecionado</h1>
                )}
            </Information>
        </div>
    )
}