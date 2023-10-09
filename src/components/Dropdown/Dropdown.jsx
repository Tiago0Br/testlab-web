import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import P from 'prop-types'

export const Dropdown = ({ label, options, currentOption, onOptionChange }) => {
    const [selectedOption, setSelectedOption] = useState('')

    const handleSelectedOption = e => {
        setSelectedOption(e.target.value)
        if (onOptionChange) onOptionChange(e.target.value)
    }

    useEffect(() => {
        if (currentOption) setSelectedOption(currentOption)
    }, [])

    return (
        <FormControl style={{ width: '375px' }}>
            <InputLabel id={`${label}-label`}>{ label }</InputLabel>
            <Select
                labelId={`${label}-label`}
                id={`${label}-dropdown`}
                label={label}
                onChange={handleSelectedOption}
                value={selectedOption}
            >
                { options?.map(({ id, name }) => (
                    <MenuItem key={`option-${id}`} value={ name }>{ name }</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

Dropdown.propTypes = {
    options: P.array.isRequired,
    label: P.string.isRequired,
    currentOption: P.string,
    onOptionChange: P.func
}