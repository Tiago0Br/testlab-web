import { useState } from 'react'
import { DropdownContainer, DropdownBtn, DropdownIcon, DropdownItem, DropdownContent, TestSuites } from './styles'
import dropdownIcon from '../../assets/dropdownIcon.svg'

// eslint-disable-next-line react/prop-types
export default function Dropdown({ options }) {
    const [isActive, setIsActive] = useState(false)
    const [selectedOption, setSelectedOption] = useState('')

    const handleIsActive = () => {
        setIsActive(!isActive)
    }

    const handleSelectedOption = e => {
        setSelectedOption(e.target.textContent)
        setIsActive(false)
    }

    return (
        <>
            <DropdownContainer>
                <DropdownBtn onClick={handleIsActive}>
                    { selectedOption || 'Selecione um projeto' }
                    <DropdownIcon src={dropdownIcon} alt='dropdown icon' />
                </DropdownBtn>
                {isActive && (
                    <DropdownContent>
                        {options?.map(({ id, name }) => (
                            <DropdownItem key={`option-${id}`} onClick={handleSelectedOption}>
                                { name }
                            </DropdownItem>
                        ))}
                    </DropdownContent>
                )}
            </DropdownContainer>
            { selectedOption && (
                <TestSuites>
                    Aqui serão exibidas as suítes de testes do projeto { selectedOption }
                </TestSuites>
            )}
        </>
    )
}