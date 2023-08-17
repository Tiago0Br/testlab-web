import { Navbar, Loading, Dropdown, Accordion } from '../../components'
import { useApi } from '../../hooks/useApi'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/Auth/AuthContext'
import { TextField, Autocomplete, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material'
import icon from '../../assets/test.svg'
import checkIcon from '../../assets/checkIcon.svg'
import { Container, Main, Img } from './styles'
import testCases from './testsMock.json'

export default function Home() {
    const api = useApi()
    const auth = useContext(AuthContext)
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(false)

    const onProjectChange = projectName => {
        const project = projects.find(currentProject => {
            return projectName === currentProject.name
        })
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
            {loading && <Loading />}
            <Navbar />
            <Container>
                <Dropdown
                    label='Projeto'
                    options={projects}
                    currentOption={getCurrentProject()}
                    onOptionChange={onProjectChange}
                />
            </Container>
            <Container>
                <TextField id="year" label="Ano" variant="outlined" />
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={['Junho', 'Julho', 'Agosto']}
                    sx={{ width: 200 }}
                    renderInput={(params) => <TextField {...params} label="Mês" />}
                />
            </Container>
            <Main>
                {testCases.map(({ name, tests }) => (
                    <Accordion title={name} key={name}>
                        {tests.map(({ name }) => (
                            <ListItem
                                key={name}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete">
                                        <Img src={checkIcon} alt="Check" />
                                    </IconButton>
                                }
                            >
                                <ListItemIcon>
                                    <Img src={icon} alt="Logo" />
                                </ListItemIcon>
                                <ListItemText primary={name} />
                            </ListItem>
                        ))}
                    </Accordion>
                ))}
            </Main>
        </div>
    )
}