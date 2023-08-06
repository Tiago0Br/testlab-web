import { useEffect, useState } from 'react'
import { DropdownContainer, DropdownBtn, DropdownIcon, DropdownItem, DropdownContent } from './styles'
import dropdownIcon from '../../assets/dropdownIcon.svg'

// eslint-disable-next-line react/prop-types
export default function Dropdown({ options, currentOption, onOptionChange }) {
    const [isActive, setIsActive] = useState(false)
    const [selectedOption, setSelectedOption] = useState('')

    const handleIsActive = () => {
        setIsActive(!isActive)
    }

    const handleSelectedOption = e => {
        setSelectedOption(e.target.textContent)
        setIsActive(false)
        onOptionChange(options, e.target.textContent)
    }

    useEffect(() => {
        if (currentOption) setSelectedOption(currentOption)
    }, [])

    return (
        <DropdownContainer>
            <DropdownBtn onClick={handleIsActive}>
                {selectedOption || 'Selecione um projeto'}
                <DropdownIcon src={dropdownIcon} alt='dropdown icon' />
            </DropdownBtn>
            {(isActive && options?.length > 0) && (
                <DropdownContent>
                    {options.map(({ id, name }) => (
                        <DropdownItem key={`option-${id}`} id={`project-${id}`} onClick={handleSelectedOption}>
                            {name}
                        </DropdownItem>
                    ))}
                </DropdownContent>
            )}
        </DropdownContainer>
    )
}