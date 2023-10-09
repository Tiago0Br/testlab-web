import { Navbar, Loading, Dropdown, Accordion, MenuButton } from '../../components'
import { useApi } from '../../hooks/useApi'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/Auth/AuthContext'
import { TextField, Autocomplete, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material'
import { Folder, Task, RuleFolder, Assignment } from '@mui/icons-material'
import { testCaseModal, folderModal } from '../../utils'
import { Container, Main, Img } from './styles'
import icon from '../../assets/test.svg'
import noContent from '../../assets/no-content.jpg'
import checkIcon from '../../assets/checkIcon.svg'
import testCases from './testsMock.json'

export const Home = () => {
    const api = useApi()
    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    const [projects, setProjects] = useState([])
    const [project, setProject] = useState('')
    const [year, setYear] = useState('')
    const [month, setMonth] = useState('')
    const [loading, setLoading] = useState(false)

    const menuOptions = [
        { name: 'Projeto', Icon: Assignment, onClick: () => navigate('/project/new') },
        { name: 'Suíte de testes', Icon: RuleFolder, onClick: () => navigate('/project/test-suit/new') },
        { name: 'Caso de testes', Icon: Task, onClick: testCaseModal },
        { name: 'Pasta', Icon: Folder, onClick: folderModal },
    ]

    const onProjectChange = projectName => {
        const project = projects.find(currentProject => {
            return projectName === currentProject.name
        })

        setProject(project)
        window.localStorage.setItem('currentProject', JSON.stringify(project))
    }

    const handleYear = e => {
        setYear(e.target.textContent)
    }

    const handleMonth = e => {
        setMonth(e.target.textContent)
    }

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
            {loading && <Loading />}
            <Navbar />
            <Container>
                <Dropdown
                    label='Projeto'
                    options={projects}
                    currentOption={project}
                    onOptionChange={onProjectChange}
                />
                <MenuButton 
                    id='add'
                    options={menuOptions}
                />
            </Container>
            <Container>
                <Autocomplete
                    disablePortal
                    id='year'
                    options={['2023', '2022', '2021']}
                    sx={{ width: 200 }}
                    renderInput={(params) => <TextField {...params} label='Ano' />}
                    value={year}
                    onChange={handleYear}
                />
                <Autocomplete
                    disablePortal
                    id='month'
                    options={['Junho', 'Julho', 'Agosto']}
                    sx={{ width: 230 }}
                    renderInput={(params) => <TextField {...params} label='Mês' />}
                    value={month}
                    onChange={handleMonth}
                />
            </Container>
            {(year && month) ? (
                <Main>
                    {testCases.map(({ name, tests }) => (
                        <Accordion title={name} key={name}>
                            {tests.map(({ name }) => (
                                <ListItem
                                    key={name}
                                    secondaryAction={
                                        <IconButton edge='end' aria-label='delete'>
                                            <Img src={checkIcon} alt='Check' />
                                        </IconButton>
                                    }
                                >
                                    <ListItemIcon>
                                        <Img src={icon} alt='Logo' />
                                    </ListItemIcon>
                                    <ListItemText primary={name} />
                                </ListItem>
                            ))}
                        </Accordion>
                    ))}
                </Main>
            ) : (
                <Main>
                    <img src={noContent} alt='Sem conteúdo para exibir' />
                    <p>Preencha os campos para buscar as suítes de testes</p>
                </Main>
            )}
        </div>
    )
}