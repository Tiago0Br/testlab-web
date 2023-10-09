import { Box, Typography } from "@mui/material"
import { Dropdown, Loading, Navbar } from "../../components"
import { useContext, useEffect, useState } from "react"
import { useApi } from "../../hooks/useApi"
import { AuthContext } from "../../contexts/Auth/AuthContext"

export const NewTestSuite = () => {
    const [projects, setProjects] = useState([])
    const [project, setProject] = useState('')
    const [loading, setLoading] = useState(false)
    const api = useApi()
    const auth = useContext(AuthContext)

    useEffect(() => {
        const getProjects = () => {
            setLoading(true)
            api.getUsersProjects(auth.user.id).then(({ projects }) => {
                setProjects(projects)
            })
            setLoading(false)
        }

        const getCurrentProject = () => {
            const project = window.localStorage.getItem('currentProject')
            if (project) {
                setProject(JSON.parse(project).name)
                return JSON.parse(project).name
            }

            setProject('')
            return;
        }

        getProjects()
        getCurrentProject()
    }, [])

    return (
        <div>
            { loading && <Loading /> }
            <Navbar activeItem='projects' />
            <Box 
                display='flex' 
                flexDirection='column' 
                alignItems='center' 
                justifyContent='center'
                margin='20px'
            >
                <Typography variant='h4' component='h1'>Criar suíte de testes</Typography>
                <Dropdown
                    label='Projeto'
                    options={projects}
                    currentOption={project}
                />
            </Box>
        </div>
    )
}