import { Navbar, Loading, Dropdown, Accordion, ButtonNew } from '../../components'
import { useApi } from '../../hooks/useApi'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/Auth/AuthContext'
import {
    TextField,
    Autocomplete,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    Menu,
    MenuItem
} from '@mui/material'
import icon from '../../assets/test.svg'
import noContent from '../../assets/no-content.jpg'
import checkIcon from '../../assets/checkIcon.svg'
import { Container, Main, Img } from './styles'
import testCases from './testsMock.json'

export default function Home() {
    const api = useApi()
    const auth = useContext(AuthContext)
    const [projects, setProjects] = useState([])
    const [project, setProject] = useState('')
    const [year, setYear] = useState('')
    const [month, setMonth] = useState('')
    const [loading, setLoading] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)

    const isOpen = Boolean(anchorEl)

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

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
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
                <ButtonNew id='btnAdd' onClickFn={handleClick} />
                <Menu
                    id='demo-customized-menu'
                    MenuListProps={{
                        'aria-labelledby': 'btnAdd',
                    }}
                    anchorEl={anchorEl}
                    open={isOpen}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose} disableRipple>
                        Novo projeto
                    </MenuItem>
                    <MenuItem onClick={handleClose} disableRipple>
                        Nova suíte de testes
                    </MenuItem>
                    <MenuItem onClick={handleClose} disableRipple>
                        Novo caso de testes
                    </MenuItem>
                    <MenuItem onClick={handleClose} disableRipple>
                        Nova pasta
                    </MenuItem>
                </Menu>
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