import { useNavigate } from 'react-router-dom'
import { Navbar, ButtonNew, Loading, Dropdown, Accordion } from '../../components'
import { useApi } from '../../hooks/useApi'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/Auth/AuthContext'
import { Container } from './styles'

const testCases = [
    {
        year: '2023',
        folders: [
            {
                name: 'Junho',
                suites: [
                    {
                        name: 'SAU-7441 - Telemedicina - Alterar layout de acesso',
                        tests: [
                            {
                                name: '01 - Receituário | QR Code',
                                description: 'Deve testar que ao realizar tal coisa deve acontecer outra coisa.'
                            },
                            {
                                name: '02 - Receituário | QR Code',
                                description: 'Deve testar que ao realizar tal coisa deve acontecer outra coisa.'
                            },
                            {
                                name: '03 - Receituário | QR Code',
                                description: 'Deve testar que ao realizar tal coisa deve acontecer outra coisa.'
                            },
                            {
                                name: '04 - Receituário | QR Code',
                                description: 'Deve testar que ao realizar tal coisa deve acontecer outra coisa.'
                            },
                            {
                                name: '05 - Receituário | QR Code',
                                description: 'Deve testar que ao realizar tal coisa deve acontecer outra coisa.'
                            },
                        ]
                    }
                ]
            },
            {
                name: 'Julho',
                suites: [
                    {
                        name: 'SAU-7441 - Telemedicina - Alterar layout de acesso',
                        tests: [
                            {
                                name: '01 - Receituário | QR Code'
                            }
                        ]
                    }
                ]
            },
            {
                name: 'Agosto',
                suites: [
                    {
                        name: 'SAU-7561 - Requisição de Suprimentos - Alterar cálculo da média',
                        tests: [
                            {
                                name: '01 - Receituário | QR Code'
                            }
                        ]
                    }
                ]
            }
        ]
    }
]

export default function Home() {
    const api = useApi()
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(false)

    const handleNewProject = () => {
        navigate('/project/new')
    }

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
                <ButtonNew onClickFn={handleNewProject} />
            </Container>
            <Container>
                { testCases.map(({ year, folders }) => (
                    <Accordion key={year} title={year}>
                        { folders.map(({ name, suites }) => (
                            <Accordion key={name} title={name}>
                                { suites.map(({ name, tests }) => (
                                    <Accordion key={name} title={name}>
                                        { tests.map(test => (
                                            <Accordion key={test.name} title={test.name}>
                                                <p>{ test.description }</p>
                                            </Accordion>
                                        ))}
                                    </Accordion>
                                ))}
                            </Accordion>
                        ))}
                    </Accordion>
                ))}
            </Container>
        </div>
    )
}